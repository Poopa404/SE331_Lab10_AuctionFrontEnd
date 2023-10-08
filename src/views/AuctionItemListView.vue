<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import AuctionCard from '../components/AuctionCard.vue'
import type { AuctionItem } from '@/type'
import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import type { AxiosResponse } from 'axios'
// import axios from 'axios'
import AuctionService from '@/services/AuctionService'
import NProgress from 'nprogress'
import { useRouter } from 'vue-router'

const auctions: Ref<AuctionItem[]> = ref([])
const totalAuctions = ref<number>(0)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const router = useRouter()

AuctionService.getAuctionItem(3, props.page)
  .then((response: AxiosResponse<AuctionItem[]>) => {
    auctions.value = response.data
    totalAuctions.value = response.headers['x-total-count']
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  let queryFunction;
  if (keyword.value === null || keyword.value === '') {
	  queryFunction = AuctionService.getAuctionItem(3, toPage)
	}else{
    queryFunction = AuctionService.getAuctionItemByKeyword(keyword.value, 3, toPage)
  } 
  queryFunction
    .then((response: AxiosResponse<AuctionItem[]>) => {
      auctions.value = response.data
      totalAuctions.value = response.headers['x-total-count']
      next()
    })
    .catch(() => {
      next({ name: 'NetworkError' })
    })
})
const hasNextPage = computed(() => {
  // first calculate the total page
  const totalPages = Math.ceil(totalAuctions.value / 2)
  return props.page.valueOf() < totalPages
})
const keyword = ref('')
function updateKeyword (value: string) {
  let queryFunction;
  if (keyword.value === ''){
    queryFunction = AuctionService.getAuctionItem(3, 1)
  }else {
    queryFunction = AuctionService.getAuctionItemByKeyword(keyword.value, 3, 1)
  }
  queryFunction.then((response: AxiosResponse<AuctionItem[]>) => {
    auctions.value = response.data
    console.log('events',auctions.value)
    totalAuctions.value = response.headers['x-total-count']
    console.log('totalEvent',totalAuctions.value)
  }).catch(() => {
    router.push({ name: 'NetworkError' })
  })
}

</script>

<template>
  <main class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput
        v-model="keyword"
        placeholder="Search..."
        class="w-full"
        @input="updateKeyword"
      />
    </div>
      
    <AuctionCard v-for="auction in auctions" :key="auction.id" :auction="auction"></AuctionCard>

    <div class="pagination">
      <RouterLink
        :to="{ name: 'auction-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
      >
        Prev Page
      </RouterLink>

      <RouterLink
        :to="{ name: 'auction-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
      >
        Next Page
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>


.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
