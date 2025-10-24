#!/usr/bin/env node

/**
 * PM ASSIGN TASK WORKFLOW TEST
 *
 * Test script for PM to assign sprint task to developer
 */

const PMHelper = require('./pm-helper-v5.2.js');

async function main() {
  console.log('🔧 PM ASSIGN TASK WORKFLOW TEST\n');
  console.log('='.repeat(60) + '\n');

  const pm = new PMHelper();

  try {
    // Step 1: Get active sprint
    console.log('📋 Step 1: Get active sprint');
    console.log('─'.repeat(60));
    const activeSprint = await pm.getActiveSprint();
    if (!activeSprint) {
      console.log('❌ No active sprint found');
      console.log('   Please create and set active sprint first');
      process.exit(1);
    }
    console.log(`✅ Active sprint: ${activeSprint.sprint_id}`);
    console.log(`   Name: ${activeSprint.name}`);
    console.log(`   Total tasks: ${activeSprint.tasks?.length || 0}\n`);

    // Step 2: Show first unassigned task
    console.log('📋 Step 2: Find unassigned task');
    console.log('─'.repeat(60));
    const unassignedTask = activeSprint.tasks?.find(t =>
      !t.assignment?.assigned_to || t.assignment.assigned_to === null
    );

    if (!unassignedTask) {
      console.log('❌ No unassigned tasks found in sprint');
      console.log('   All tasks are already assigned\n');

      // Show all tasks
      console.log('Current tasks:');
      activeSprint.tasks?.forEach(t => {
        console.log(`  - ${t.task_id}: ${t.title}`);
        console.log(`    Assigned to: ${t.assignment?.assigned_to || 'unassigned'}`);
      });
      process.exit(1);
    }

    console.log(`✅ Found unassigned task: ${unassignedTask.task_id}`);
    console.log(`   Title: ${unassignedTask.title}`);
    console.log(`   Description: ${unassignedTask.description}\n`);

    // Step 3: Assign task to dev
    console.log('📋 Step 3: Assign task to developer');
    console.log('─'.repeat(60));
    console.log('Calling pm.assignTask()...\n');

    const result = await pm.assignTask(
      activeSprint.sprint_id,
      unassignedTask.task_id,
      'dev-agent-1',
      {
        title: unassignedTask.title,
        description: unassignedTask.description,
        estimated_hours: unassignedTask.estimated_hours
      },
      'Please implement this task according to sprint plan'
    );

    console.log('✅ Task assigned successfully!');
    console.log(`   Assignment ID: ${result.assignment_id}`);
    console.log(`   Sprint: ${result.sprint_id}`);
    console.log(`   Task: ${result.sprint_task_id}`);
    console.log(`   Assigned to: ${result.assigned_to}`);
    console.log(`   Status: ${result.status}\n`);

    // Step 4: Verify assignment appears in orchestrator
    console.log('📋 Step 4: Verify assignment in orchestrator');
    console.log('─'.repeat(60));

    const assignments = await pm.listAssignments('assigned');
    console.log(`Total active assignments: ${assignments.length}`);

    const thisAssignment = assignments.find(a => a.id === result.assignment_id);
    if (thisAssignment) {
      console.log('✅ Assignment found in orchestrator:');
      console.log(`   ID: ${thisAssignment.id}`);
      console.log(`   Task: ${thisAssignment.sprint_task_id}`);
      console.log(`   Assigned to: ${thisAssignment.assigned_to}`);
      console.log(`   Status: ${thisAssignment.status}`);
    } else {
      console.log('⚠️  Assignment not found in list (may need refresh)');
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎉 PM ASSIGN TASK WORKFLOW COMPLETED!\n');
    console.log('Next steps:');
    console.log('  1. Open dashboard at http://localhost:3001');
    console.log('  2. Check Current Queue - you should see the assignment');
    console.log(`  3. Task ID: ${result.sprint_task_id}`);
    console.log(`  4. Type: sprint-task`);
    console.log(`  5. Status: ASSIGNED`);
    console.log('');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.response) {
      console.error('   Response:', JSON.stringify(error.response, null, 2));
    }
    process.exit(1);
  }
}

main();
