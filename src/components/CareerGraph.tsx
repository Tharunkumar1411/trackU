import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface StudyData {
  date: string;
  completedTasks: number;
  totalTasks: number;
  studyTime: number;
}

interface CareerGraphProps {
  data: StudyData[];
}

export default function CareerGraph({ data }: CareerGraphProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Calculate performance score (0-100)
    const performanceData = data.map(item => ({
      date: item.date,
      score: Math.round((item.completedTasks / item.totalTasks) * 100)
    }));

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: performanceData.map(item => item.date),
        datasets: [
          {
            label: 'Performance Score',
            data: performanceData.map(item => item.score),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
            callbacks: {
              label: function(context: { parsed: { y: number } }) {
                return `Performance: ${context.parsed.y}%`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              callback: function(tickValue: number | string) {
                return typeof tickValue === 'number' ? `${tickValue}%` : tickValue;
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-8 bg-green-400 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-800">Career Growth</h2>
      </div>
      <div className="h-[400px]">
        <canvas ref={chartRef} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-sm text-gray-600">Average Score</div>
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(data.reduce((acc, curr) => acc + (curr.completedTasks / curr.totalTasks) * 100, 0) / data.length)}%
          </div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-sm text-gray-600">Total Study Time</div>
          <div className="text-2xl font-bold text-green-600">
            {Math.round(data.reduce((acc, curr) => acc + curr.studyTime, 0) / 60)}h
          </div>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="text-sm text-gray-600">Completion Rate</div>
          <div className="text-2xl font-bold text-purple-600">
            {Math.round((data.reduce((acc, curr) => acc + curr.completedTasks, 0) / 
              data.reduce((acc, curr) => acc + curr.totalTasks, 0)) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
} 