// ============================================
// SHARED SIDEBAR FOR FINANCE MODULE
// ============================================
// Usage: <script src="../../../sidebar.js"></script>
//        <script>renderSidebar();</script>

function renderSidebar() {
    const basePath = window.SIDEBAR_BASE_PATH || '../../../';

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = `
        /* Sidebar Styles */
        .sidebar {
            position: fixed;
            left: 0;
            top: 65px;
            width: 250px;
            height: calc(100vh - 65px);
            background-color: #f8f9fa;
            border-right: 1px solid #ddd;
            overflow-y: auto;
            z-index: 900;
            padding: 20px 0;
            transition: left 0.3s ease;
        }

        .sidebar-menu {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .sidebar-menu > li {
            margin-bottom: 5px;
        }

        .sidebar-link {
            display: block;
            padding: 10px 20px;
            color: #333;
            text-decoration: none;
            transition: all 0.2s;
            font-size: 14px;
        }

        .sidebar-link:hover {
            background-color: #e9ecef;
            color: #007bff;
            padding-left: 25px;
        }

        .sidebar-link.active {
            background-color: #007bff;
            color: white;
            font-weight: 500;
        }

        .sidebar-link.active:hover {
            background-color: #0056b3;
        }

        .submenu-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            cursor: pointer;
            user-select: none;
            font-size: 14px;
            font-weight: 500;
            color: #333;
            transition: background-color 0.2s;
        }

        .submenu-toggle:hover {
            background-color: #e9ecef;
        }

        .submenu-toggle .arrow {
            transition: transform 0.3s;
            font-size: 10px;
        }

        .submenu-toggle.open .arrow {
            transform: rotate(90deg);
        }

        .submenu {
            list-style: none;
            padding: 0;
            margin: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .submenu.show {
            max-height: 500px;
        }

        .submenu .sidebar-link {
            padding-left: 40px;
            font-size: 13px;
        }

        .submenu .sidebar-link:hover {
            padding-left: 45px;
        }

        .sidebar-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 850;
        }

        .sidebar-overlay.show {
            display: block;
        }

        @media (max-width: 768px) {
            .sidebar {
                left: -250px;
            }
            .sidebar.show-mobile {
                left: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Inject HTML
    const sidebarHTML = `
        <nav class="sidebar">
            <ul class="sidebar-menu">
                <!-- Dashboard -->
                <li>
                    <a href="#" class="sidebar-link" data-page="dashboard">
                        📊 Dashboard
                    </a>
                </li>

                <!-- Master Data Section -->
                <li>
                    <div class="submenu-toggle" onclick="toggleSubmenu(this)">
                        <span>⚙️ Master Data</span>
                        <span class="arrow">▶</span>
                    </div>
                    <ul class="submenu">
                        <li><a href="${basePath}Dimension/2_ThietKe/html-prototypes/1_dimension-definition.html" class="sidebar-link" data-page="dimension-definition">Dimension Definition</a></li>
                        <li><a href="${basePath}Dimension/2_ThietKe/html-prototypes/2_dimension-values.html" class="sidebar-link" data-page="dimension-values">Dimension Values</a></li>
                        <li><a href="${basePath}Dimension/2_ThietKe/html-prototypes/3_account-dimension-mapping.html" class="sidebar-link" data-page="account-dimension-mapping">Account-Dimension Mapping</a></li>
                    </ul>
                </li>

                <!-- Transactions Section -->
                <li>
                    <div class="submenu-toggle" onclick="toggleSubmenu(this)">
                        <span>📝 Transactions</span>
                        <span class="arrow">▶</span>
                    </div>
                    <ul class="submenu">
                        <li><a href="${basePath}Cashin-out/2_ThietKe/html-prototypes/1_transaction-list.html" class="sidebar-link" data-page="transaction-list">Transaction List</a></li>
                        <li><a href="${basePath}Cashin-out/2_ThietKe/html-prototypes/2_create-cashin.html" class="sidebar-link" data-page="create-cashin">Cash In</a></li>
                        <li><a href="${basePath}Cashin-out/2_ThietKe/html-prototypes/3_create-cashout.html" class="sidebar-link" data-page="create-cashout">Cash Out</a></li>
                        <li><a href="#" class="sidebar-link" data-page="manual-journal">Manual Journal Entry</a></li>
                        <li><a href="#" class="sidebar-link" data-page="initial-balance">Initial Balance</a></li>
                    </ul>
                </li>

                <!-- Reports Section -->
                <li>
                    <div class="submenu-toggle" onclick="toggleSubmenu(this)">
                        <span>📊 Reports</span>
                        <span class="arrow">▶</span>
                    </div>
                    <ul class="submenu">
                        <li><a href="#" class="sidebar-link" data-page="cashflow-report">Cashflow Report</a></li>
                        <li><a href="#" class="sidebar-link" data-page="balance-sheet">Balance Sheet</a></li>
                        <li><a href="#" class="sidebar-link" data-page="income-statement">Income Statement</a></li>
                    </ul>
                </li>

                <!-- System Section -->
                <li>
                    <div class="submenu-toggle" onclick="toggleSubmenu(this)">
                        <span>🔧 System</span>
                        <span class="arrow">▶</span>
                    </div>
                    <ul class="submenu">
                        <li><a href="#" class="sidebar-link" data-page="user-management">User Management</a></li>
                        <li><a href="#" class="sidebar-link" data-page="role-permissions">Role & Permissions</a></li>
                        <li><a href="#" class="sidebar-link" data-page="audit-log">Audit Log</a></li>
                    </ul>
                </li>
            </ul>
        </nav>

        <!-- Sidebar Overlay for Mobile -->
        <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
    `;

    const container = document.getElementById('sidebar-container');
    if (container) {
        container.innerHTML = sidebarHTML;
        highlightCurrentPage();
    }
}

// Toggle submenu open/close
function toggleSubmenu(element) {
    const submenu = element.nextElementSibling;
    element.classList.toggle('open');
    submenu.classList.toggle('show');
}

// Toggle sidebar on mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('show-mobile');
        overlay.classList.toggle('show');
    }
}

// Highlight current page in sidebar
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop().replace('.html', '');

    document.querySelectorAll('.sidebar-link').forEach(link => {
        const page = link.getAttribute('data-page');
        if (currentFile.includes(page)) {
            link.classList.add('active');
            // Open parent submenu
            const submenu = link.closest('.submenu');
            if (submenu) {
                submenu.classList.add('show');
                const toggle = submenu.previousElementSibling;
                if (toggle) toggle.classList.add('open');
            }
        }
    });
}
