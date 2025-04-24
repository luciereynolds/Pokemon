export default function Card({ title, children }) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
      <div className="text-gray-600">{children}</div>
    </div>
    );
}