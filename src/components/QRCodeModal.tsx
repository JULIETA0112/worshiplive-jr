import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QRCodeModal = ({ open, onOpenChange }: QRCodeModalProps) => {
  const spectatorUrl = `${window.location.origin}/espectador`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modo Espectador</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCodeSVG value={spectatorUrl} size={256} />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Escanea este código QR para ver la proyección</p>
            <p className="text-xs text-gray-500 break-all">{spectatorUrl}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
