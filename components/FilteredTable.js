import { useState, useEffect } from 'react';
import faker from 'faker';

const generateFakeData = () => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      id: i + 1,
      name: faker.name.findName(),
      date: faker.date.between('2024-01-01', '2024-12-31').toLocaleDateString(),
      // Add other fields as needed
    });
  }
  return data;
};

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const FilteredTable = () => {
  const [selectedMonthYear, setSelectedMonthYear] = useState(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    return `${monthNames[currentMonth - 1]}/${currentYear}`;
  });

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Extract month and year from the selected string
    const [selectedMonth, selectedYear] = selectedMonthYear.split('/');

    // Calculate start and end dates based on selected month and year
    const startDate = new Date(selectedYear, parseInt(selectedMonth, 10) - 2, 26);
    const endDate = new Date(selectedYear, parseInt(selectedMonth, 10) - 1, 25);

    // Generate fake data (replace this with your actual data fetching logic)
    const fakeData = generateFakeData();

    // Filter data based on the date range
    const filtered = fakeData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });

    setFilteredData(filtered);
  }, [selectedMonthYear]);

  const handleMonthYearChange = (event) => {
    setSelectedMonthYear(event.target.value);
  };

  return (
    <div>
      <label htmlFor="monthYear">Month/Year:</label>
      <select id="monthYear" onChange={handleMonthYearChange} value={selectedMonthYear}>
        {Array.from({ length: 12 }, (_, index) => {
          const year = new Date().getFullYear();
          const month = monthNames[index];
          return (
            <option key={index} value={`${month}/${year}`}>
              {`${month}/${year}`}
            </option>
          );
        })}
      </select>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilteredTable;
