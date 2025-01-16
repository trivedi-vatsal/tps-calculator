"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react"; // Importing Trash icon for delete action
import { CSVLink } from "react-csv"; // Importing CSV export

export default function Home() {
  const [customerBase, setCustomerBase] = useState(0);
  const [transactionsPerDay, setTransactionsPerDay] = useState(0);
  const [results, setResults] = useState({
    totalEvents: 0,
    perDay: 0,
    hourly: 0,
    perSecond: 0,
  });
  const [history, setHistory] = useState<any[]>([]);

  const customerBaseOptions = [100000, 250000, 500000, 1000000, 5000000];
  const transactionsPerDayOptions = [5, 10, 25, 50, 100];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalEvents = Math.ceil(customerBase * transactionsPerDay);
    const perDay = Math.ceil(totalEvents / 30);
    const hourly = Math.ceil(perDay / 24);
    const perSecond = Math.ceil(hourly / 3600);
    setResults({ totalEvents, perDay, hourly, perSecond });
  };

  const handleSave = () => {
    // Save the results to history
    setHistory((prevHistory) => [
      ...prevHistory,
      { customerBase, transactionsPerDay, ...results },
    ]);
  };

  const handleDelete = (index: number) => {
    setHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
  };

  const handlePrefillCustomerBase = (value: number) => {
    setCustomerBase(value);
  };

  const handlePrefillTransactionsPerDay = (value: number) => {
    setTransactionsPerDay(value);
  };

  // Prepare CSV data without action column
  const csvData = history.map(
    ({
      customerBase,
      transactionsPerDay,
      totalEvents,
      perDay,
      hourly,
      perSecond,
    }) => ({
      customerBase,
      transactionsPerDay,
      totalEvents,
      perDay,
      hourly,
      perSecond,
    })
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Nav Bar */}
      <nav className="w-full bg-gray-900 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">TPS Calculator</h1>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">
            Leverage Transaction Data for Smarter Decisions
          </h1>
          <p className="mt-4 text-lg">
            Use advanced metrics to guide your decisions and optimize
            performance.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto py-8 flex-1 px-2">
        {/* Info Card */}
        <Card className="bg-gray-800 text-white mb-6">
          <CardHeader>
            <CardTitle>About the Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Discover how your customer base and transaction volume translate
              into actionable metrics. From total events to granular per-second
              insights, we've got you covered.
            </p>
          </CardContent>
        </Card>
        {/* Calculator Card */}
        <Card className="bg-gray-800 text-white mb-6">
          <CardHeader>
            <CardTitle>Transaction Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customer Base Input */}
                <div>
                  <Label htmlFor="customerBase" className="block mb-1">
                    Customer Base:
                  </Label>
                  <Input
                    id="customerBase"
                    type="number"
                    value={customerBase}
                    onChange={(e) => setCustomerBase(Number(e.target.value))}
                    className="w-full bg-black text-white"
                    required
                  />
                  {/* Prefill Pills for Customer Base */}
                  <div className="flex flex-wrap space-x-4 mt-4 justify-center">
                    {customerBaseOptions.map((option) => (
                      <div className="pb-1" key={option}>
                        <Button
                          type="button"
                          onClick={() => handlePrefillCustomerBase(option)}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full"
                        >
                          {option.toLocaleString()}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transactions per Day Input */}
                <div>
                  <Label htmlFor="transactionsPerDay" className="block mb-1">
                    Transactions per Day:
                  </Label>
                  <Input
                    id="transactionsPerDay"
                    type="number"
                    value={transactionsPerDay}
                    onChange={(e) =>
                      setTransactionsPerDay(Number(e.target.value))
                    }
                    className="w-full bg-black text-white"
                    required
                  />
                  {/* Prefill Pills for Transactions per Day */}
                  <div className="flex flex-wrap space-x-4 mt-4 justify-center">
                    {transactionsPerDayOptions.map((option) => (
                      <div className="pb-1" key={option}>
                        <Button
                          type="button"
                          onClick={() =>
                            handlePrefillTransactionsPerDay(option)
                          }
                          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full"
                        >
                          {option}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculate and Save Buttons */}
              <div className="flex space-x-4 mt-4">
                <Button
                  type="submit"
                  className="w-1/2 bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Calculate
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  className="w-1/2 bg-green-600 hover:bg-green-500 text-white"
                >
                  Save Results
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Display - Responsive Grid for Cards */}
        <Card className="bg-gray-800 text-white mb-6">
          <CardHeader>
            <CardTitle>Calculation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gray-800 text-white text-center">
                <CardHeader>
                  <CardTitle>Total Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl">
                    {results.totalEvents.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 text-white text-center">
                <CardHeader>
                  <CardTitle>Events per Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl">{results.perDay.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 text-white text-center">
                <CardHeader>
                  <CardTitle>Events per Hour</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl">{results.hourly.toLocaleString()}</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 text-white text-center">
                <CardHeader>
                  <CardTitle>Events per Second</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl">
                    {results.perSecond.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* History Table Card */}
        <Card className="bg-gray-800 text-white mb-6">
          <CardHeader>
            <CardTitle>Calculation History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <CSVLink
                data={csvData}
                filename="transaction_calculation_history.csv"
                className="bg-blue-600 text-white p-2 rounded"
              >
                Export as CSV
              </CSVLink>
            </div>

            <div className="overflow-x-auto">
              <table
                className="min-w-max text-center table-fixed border-separate border border-gray-700"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-600">
                      Customer Base
                    </th>
                    <th className="px-4 py-2 border-b border-gray-600">
                      Transactions per Day
                    </th>
                    <th className="px-4 py-2 border-b border-gray-600">
                      Total Events
                    </th>
                    <th className="px-4 py-2 border-b border-gray-600">
                      Events per Day
                    </th>
                    <th className="px-4 py-2 border-b border-gray-600">
                      Events per Hour
                    </th>
                    <th className="px-4 py-2 border-b border-gray-600">
                      Events per Second
                    </th>
                    <th className="px-4 py-2 border-b border-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b border-gray-600">
                        {entry.customerBase}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-600">
                        {entry.transactionsPerDay}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-600">
                        {entry.totalEvents}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-600">
                        {entry.perDay}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-600">
                        {entry.hourly}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-600">
                        {entry.perSecond}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <Button
                          type="button"
                          onClick={() => handleDelete(index)}
                          className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-full"
                        >
                          <Trash size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 p-4 text-center">
        <p className="text-gray-400">
          Built with ❤️ and pride, by the MobiLytix Rewards Team!
        </p>
      </footer>
    </div>
  );
}
