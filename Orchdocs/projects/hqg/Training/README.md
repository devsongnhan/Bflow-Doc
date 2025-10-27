# Training Documents - HQG Project

**Purpose:** Customer training and documentation materials for HQG project

## Overview

This folder contains training documents and materials designed for customer education and system procedures for the HQG project.

## Document Types

Training documents can be of the following types:

- **user_guide** - Step-by-step guides for end-users
- **procedure** - Standard operating procedures for common tasks
- **faq** - Frequently Asked Questions and answers
- **video_guide** - Scripts or references for video tutorials
- **checklist** - Checklists for tasks or verification

## Difficulty Levels

- **beginner** - For new users learning the basics
- **intermediate** - For users familiar with basics, learning advanced features
- **advanced** - For power users or administrators

## Training Document Workflow

```
QA creates training document (draft)
    ↓
QA submits to PM for review (pending)
    ↓
PM reviews and approves/rejects
    ├→ APPROVE → approved ✓ (ready for customer distribution)
    └→ REJECT → rejected ✗ (QA revises and resubmits)
```

## Document Structure

Each training document should include:

1. **Overview** - What this training is about
2. **Objectives** - Learning goals for the user
3. **Sections** - Organized content with examples
4. **FAQ** - Common questions and answers
5. **Best Practices** - Tips for optimal use
6. **Troubleshooting** - Common issues and solutions

## Creating Training Documents

**Trigger:** `qaHelper.createTrainingDocument(trainingData)`

**Required fields:**
- title: Document title
- training_type: user_guide, procedure, faq, video_guide, or checklist
- description: What the training covers
- target_audience: Who this is for (e.g., "End-users", "Administrators")
- difficulty_level: beginner, intermediate, or advanced
- content: Full training content

## File Naming Convention

Training files follow the pattern:
```
{training_id}-{TITLE}.md

Example:
training-1761275745861-m4k9p2x7-HQGUserGuide.md
```

## Status Tracking

- **draft** - Created by QA, under preparation
- **pending** - Submitted to PM for review
- **approved** - ✓ Ready for customer distribution
- **rejected** - ✗ Requires revision (with PM feedback)

## Approval Process

Training documents must be approved by PM before distribution to customers. PM will:
1. Review content accuracy and completeness
2. Check clarity and accessibility for target audience
3. Verify alignment with system features
4. Provide feedback if revision is needed

---

**Project:** HQG
**Created:** 2025-10-24
**Last Updated:** 2025-10-24
