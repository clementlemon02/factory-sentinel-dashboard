
import { useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QRCodeDisplayProps {
  size?: number;
  value: string;
  title?: string;
  description?: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ 
  size = 200, 
  value, 
  title = "Report Incident", 
  description = "Scan this QR code to report a new safety incident" 
}) => {
  // The actual QR code would be generated here in a real application
  // This is a placeholder that draws a simple "fake" QR code
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Clear canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, size, size);
        
        // Draw a border
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, size, size);
        
        // Draw some patterns to make it look like a QR code
        ctx.fillStyle = 'black';
        
        // Draw position markers (three corners)
        // Top left
        ctx.fillRect(10, 10, 30, 30);
        ctx.fillStyle = 'white';
        ctx.fillRect(15, 15, 20, 20);
        ctx.fillStyle = 'black';
        ctx.fillRect(20, 20, 10, 10);
        
        // Top right
        ctx.fillStyle = 'black';
        ctx.fillRect(size - 40, 10, 30, 30);
        ctx.fillStyle = 'white';
        ctx.fillRect(size - 35, 15, 20, 20);
        ctx.fillStyle = 'black';
        ctx.fillRect(size - 30, 20, 10, 10);
        
        // Bottom left
        ctx.fillStyle = 'black';
        ctx.fillRect(10, size - 40, 30, 30);
        ctx.fillStyle = 'white';
        ctx.fillRect(15, size - 35, 20, 20);
        ctx.fillStyle = 'black';
        ctx.fillRect(20, size - 30, 10, 10);
        
        // Draw random dots to simulate QR code data
        ctx.fillStyle = 'black';
        for (let i = 0; i < 100; i++) {
          const x = Math.floor(Math.random() * (size - 60)) + 50;
          const y = Math.floor(Math.random() * (size - 60)) + 50;
          const dotSize = Math.floor(Math.random() * 6) + 2;
          ctx.fillRect(x, y, dotSize, dotSize);
        }
      }
    }
  }, [size]);

  const downloadQRCode = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'safety-incident-report-qr.png';
      link.href = url;
      link.click();
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <canvas ref={canvasRef} width={size} height={size} className="mb-4" />
        <p className="text-sm text-center text-gray-500 mb-4">
          {value}
        </p>
        <Button onClick={downloadQRCode}>Download QR Code</Button>
      </CardContent>
    </Card>
  );
};

export default QRCodeDisplay;
