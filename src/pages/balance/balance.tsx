export const BalancePage = () => {
  const balance = 250000; 
  const topUpInstructions = [
    "Transfer ke rekening BCA 123-456-789 a/n KameraApp",
    "Gunakan e-wallet OVO/GoPay dengan nomor 0812-3456-7890",
    "Konfirmasi pembayaran via WhatsApp ke +62 812 3456 7890",
  ];

  const history = [
    { id: 1, amount: 100000, date: "2024-08-01" },
    { id: 2, amount: 150000, date: "2024-08-05" },
  ];

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          Saldo Saya
        </h1>

        <div className="text-center my-8">
          <p className="text-blue-500 font-medium uppercase tracking-wide">Saldo Saat Ini</p>
          <p className="text-4xl font-extrabold text-blue-900 mt-2">
            Rp {balance.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-blue-700 border-b border-blue-200 pb-1">
            Cara Top Up
          </h2>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            {topUpInstructions.map((instr, idx) => (
              <li key={idx} className="leading-relaxed">{instr}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-700 border-b border-blue-200 pb-1">
            Riwayat Top Up
          </h2>
          {history.length === 0 ? (
            <p className="text-blue-400 italic text-center">Belum ada riwayat top up.</p>
          ) : (
            <ul className="space-y-3">
              {history.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between bg-blue-100 p-4 rounded-lg shadow-sm"
                >
                  <span className="text-blue-700 font-medium">{item.date}</span>
                  <span className="text-blue-900 font-bold">
                    +Rp {item.amount.toLocaleString("id-ID")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
