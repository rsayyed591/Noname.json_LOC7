import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Donation } from "@/lib/types/donation"

interface DonationDetailsModalProps {
  donation: Donation | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DonationDetailsModal({ donation, open, onOpenChange }: DonationDetailsModalProps) {
  if (!donation) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{donation.foodName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative h-[200px] w-full">
            <img
              src={donation.imageUrl || "/placeholder.svg"}
              alt={donation.foodName}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Quantity</p>
              <p className="text-sm text-muted-foreground">{donation.quantity}</p>
            </div>
            <div>
              <p className="font-medium">Serves</p>
              <p className="text-sm text-muted-foreground">{donation.peopleCount} people</p>
            </div>
            <div>
              <p className="font-medium">Food Type</p>
              <p className="text-sm text-muted-foreground capitalize">{donation.foodType}</p>
            </div>
            <div>
              <p className="font-medium">Status</p>
              <p className="text-sm text-muted-foreground capitalize">{donation.status}</p>
            </div>
          </div>
          <div>
            <p className="font-medium">NGO</p>
            <p className="text-sm text-muted-foreground">{donation.ngoName}</p>
          </div>
          <div>
            <p className="font-medium">AI Quality Assessment</p>
            <p className="text-sm text-muted-foreground">{donation.aiQuality}</p>
          </div>
          {donation.description && (
            <div>
              <p className="font-medium">Description</p>
              <p className="text-sm text-muted-foreground">{donation.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

