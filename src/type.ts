export interface AuctionItem {
  id: number
  description: string
  type: string
  successfulBid: BidItem | string
  bids: BidItem | string
}

export interface BidItem {
  id: number
  amount: number
  dateTime: string
  auctionItem: AuctionItem | string
}

