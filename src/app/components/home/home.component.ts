import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

interface BarData {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  label: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('myChart', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  bars: BarData[] = [];

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const canvas: HTMLCanvasElement | null = this.canvasRef.nativeElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const barChartData = [65, 59, 80, 81, 56, 55, 40];
        const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];

        const barWidth = 60;
        const barSpacing = 30;
        const startY = canvas.height - 50;

        const maxValue = Math.max(...barChartData);
        const scaleFactor = (canvas.height - 100) / maxValue;

        ctx.fillStyle = '#4CAF50';

        for (let i = 0; i < barChartData.length; i++) {
          const barHeight = barChartData[i] * scaleFactor;
          const startX = (i * (barWidth + barSpacing)) + 50;

          ctx.fillRect(startX, startY - barHeight, barWidth, barHeight);

          ctx.fillStyle = '#000';
          ctx.fillText(labels[i], startX + 10, canvas.height - 20);

          // Guardar información de cada barra
          this.bars.push({
            x: startX,
            y: startY - barHeight,
            width: barWidth,
            height: barHeight,
            value: barChartData[i],
            label: labels[i]
          });
        }

        // Evento de clic en el canvas
        canvas.addEventListener('click', (event) => {
          const rect = canvas.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          // Verificar si el clic fue dentro de alguna barra
          this.bars.forEach((bar) => {
            if (x >= bar.x && x <= bar.x + bar.width && y >= bar.y && y <= bar.y + bar.height) {
              this.highlightBar(ctx, bar);
              console.log(`Haz hecho clic en la barra ${bar.label} - Valor: ${bar.value}`);
            }
          });
        });
      } else {
        console.error('Contexto 2D no disponible');
      }
    } else {
      console.error('Canvas no disponible');
    }
  }

  // Función para resaltar la barra seleccionada
  highlightBar(ctx: CanvasRenderingContext2D, bar: BarData) {
    ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.createChart(); // Redibujar el gráfico

    // Resaltar la barra
    ctx.fillStyle = '#FF5722';
    ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
    ctx.fillStyle = '#000';
    ctx.fillText(bar.label, bar.x + 10, this.canvasRef.nativeElement.height - 20);
  }
}
