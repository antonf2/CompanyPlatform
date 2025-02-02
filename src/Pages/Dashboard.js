import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getMovements } from '../Services/useMovementsLogic';

const Dashboard = () => {
    const [movements, setMovements] = useState([]);

    useEffect(() => {
        const fetchMovements = async () => {
            try {
                const data = await getMovements();
                setMovements(data);
            } catch (error) {
                toast.error('Error loading inventory movements.');
            }
        };
        fetchMovements();
    }, []);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Inventory Movements</h2>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">Item ID</th>
                            <th className="border px-4 py-2">User ID</th>
                            <th className="border px-4 py-2">Action</th>
                            <th className="border px-4 py-2">Quantity Changed</th>
                            <th className="border px-4 py-2">Notes</th>
                            <th className="border px-4 py-2">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movements.length > 0 ? (
                            movements.map(movement => (
                                <tr key={movement.movementId} className="border">
                                    <td className="border px-4 py-2">{movement.itemId}</td>
                                    <td className="border px-4 py-2">{movement.userId}</td>
                                    <td className="border px-4 py-2">{movement.action}</td>
                                    <td className="border px-4 py-2">{movement.quantityChanged}</td>
                                    <td className="border px-4 py-2">{movement.notes || '-'}</td>
                                    <td className="border px-4 py-2">{new Date(movement.timestamp).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center px-4 py-2">No movements found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;