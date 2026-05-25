import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Order {
  id: string;
  userId: string;
  total: number;
  status: string;
}

export function OrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => axios.get("/api/orders").then((r) => r.data.orders),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Customer</th>
            <th className="text-left p-2">Total</th>
            <th className="text-left p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((order: Order) => (
            <tr key={order.id} className="border-b">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.userId}</td>
              <td className="p-2">${order.total}</td>
              <td className="p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
