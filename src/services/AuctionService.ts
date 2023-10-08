import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { AuctionItem } from '@/type'
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getAuctionItem(perPage: number, page: number): Promise<AxiosResponse<AuctionItem[]>> {
    return apiClient.get<AuctionItem[]>('/auction_items?_limit=' + perPage + '&_page=' + page)
  },
  getAuctionItemById(id: number): Promise<AxiosResponse<AuctionItem>> {
    return apiClient.get<AuctionItem>('auction_items/' + id.toString())
  },
  saveAuctionItem(event: AuctionItem): Promise<AxiosResponse<AuctionItem>> {
    return apiClient.post<AuctionItem>('/auction_items', event)
  },
  getAuctionItemByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<AuctionItem[]>> {
    return apiClient.get<AuctionItem[]>('/auction_items?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
  }
  
}
