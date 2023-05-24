import { Chart, ChartData, ChartOptions, ChartTypeRegistry } from "chart.js/auto";
import axios from "../helpers/axios";

const generateChart = (type: keyof ChartTypeRegistry, container: string, dataUrl: string, options: ChartOptions, label: string) => {
    const ctx: HTMLCanvasElement | null = document.querySelector(`${container} canvas`);

    if (!ctx) return;

    let data: ChartData;

    axios.get(dataUrl).then(
        (res) => {
            data = {
                labels: res.data.map((row: any) => row.hour),
                datasets: [
                    {
                        label,
                        data: res.data.map((row: any) => row.count)
                    }
                ]
            };

            new Chart(ctx, {
                data,
                type,
                options
            });
        }
    ).catch((e) => console.log(e));
};

export default generateChart;
