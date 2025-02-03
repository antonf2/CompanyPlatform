export default function Wiki() {
    return (
        <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg w-full">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to My Application</h1>
            
            <section id="overview" className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Overview</h2>
                <p className="text-gray-600">This application provides inventory management, user role-based access, and documentation of inventory movements. It leverages React, Axios, and JWT authentication for a seamless experience.</p>
            </section>

            <section id="authentication" className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Authentication</h2>
                <p className="text-gray-600">Users log in using JWT-based authentication. Admins have access to management features, while general users have restricted permissions.</p>
            </section>
            
            <section id="dashboard" className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Dashboard</h2>
                <p className="text-gray-600">The dashboard provides an overview of inventory movements, displaying recent transactions and stock changes.</p>
            </section>
            
            <section id="management" className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Management</h2>
                <p className="text-gray-600">Admins can manage users, assign roles, and perform administrative tasks such as account activation and deactivation. Only admins can create new users.</p>
            </section>
            
            <section id="inventory" className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Inventory</h2>
                <p className="text-gray-600">Users can add, update, and delete items in inventory. Every change is logged as an inventory movement.</p>
            </section>
            
            <section id="services" className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Services</h2>
                <p className="text-gray-600">The application includes multiple services to manage business logic and API interactions.</p>

                <h3 className="text-lg font-semibold text-gray-700 mt-4">Inventory Service</h3>
                <p className="text-gray-600">Handles all CRUD operations on inventory items and logs every transaction.</p>
                <ul className="list-disc ml-6 text-gray-600">
                    <li>Uses Axios for API calls.</li>
                    <li>Manages authentication using JWT.</li>
                    <li>Logs movements when items are created, updated, or deleted.</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-700 mt-4">User Management Service</h3>
                <p className="text-gray-600">Allows admins to manage user accounts and assign roles.</p>
                <ul className="list-disc ml-6 text-gray-600">
                    <li>Handles role-based access.</li>
                    <li>Supports account activation and deactivation.</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-700 mt-4">Movement Tracking Service</h3>
                <p className="text-gray-600">Logs all inventory changes for auditing purposes.</p>
                <ul className="list-disc ml-6 text-gray-600">
                    <li>Tracks every stock modification.</li>
                    <li>Allows reporting of inventory movements.</li>
                </ul>
            </section>

            <section id="components" className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Core Components</h2>
                <p className="text-gray-600">The app features reusable UI components that enhance user experience and maintainability.</p>
                <ul className="list-disc ml-6 text-gray-600">
                    <li><strong>Layout:</strong> Provides consistent structure across pages.</li>
                    <li><strong>Header:</strong> Displays navigation and user options.</li>
                    <li><strong>Tables & Forms:</strong> Used across management and inventory pages for data input and display.</li>
                </ul>
            </section>
        </div>
    );
}
