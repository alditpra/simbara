'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'GRAFIK ZIS BAZNAS',
        },
    },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

type ChartDataProps = {
    pemasukan: number[];
    pendistribusian: number[];
}

export function ZisChart({ data, type = 'bar' }: { data: ChartDataProps, type?: 'bar' | 'line' }) {
    const chartData = {
        labels,
        datasets: [
            {
                label: type === 'bar' ? 'Pemasukan ZIS' : 'Pendistribusian ZIS',
                data: type === 'bar' ? data.pemasukan : data.pendistribusian,
                backgroundColor: type === 'bar' ? '#4a90e2' : 'rgba(245, 166, 35, 0.5)',
                borderColor: type === 'bar' ? undefined : '#f5a623',
                borderWidth: type === 'bar' ? 0 : 3,
                tension: 0.3, // Smooth line
                fill: type === 'line', // Fill area under line
            },
        ],
    };

    return type === 'bar'
        ? <Bar options={options} data={chartData} />
        : <Line options={options} data={chartData} />;
}
