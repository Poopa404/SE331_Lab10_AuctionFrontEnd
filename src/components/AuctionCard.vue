<script setup lang="ts">
import type { AuctionItem } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  auction: {
    type: Object as PropType<AuctionItem>,
    require: false
  }
})
</script>

<template>
    <div class="event-class">
      <div class="event-card">
        <span>{{ auction?.description }}</span>
        <h4>{{ auction?.type }}</h4>
        <span>Successful Bid</span>
        <h5>{{auction?.successfulBid}}</h5>
      </div>
    </div>
</template>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
