<template>
  <v-card
    class="my-2 d-flex align-center pa-3"
    :style="background ? '' : 'background: none; border:none'"
    outlined
    rounded="xl"
    height="86"
  >
    <div class="d-flex justify-space-between align-center" style="width: 100%">
      <div class="d-flex align-center">
        <v-avatar size="50" tile>
          <v-img
            v-if="credit.name != undefined"
            :src="creditImg[credit.name.toLowerCase()]"
            alt="res_img"
            contain
          />
          <v-icon v-else size="50"> mdi-cash </v-icon>
        </v-avatar>
        <div class="ml-5 d-flex flex-column justify-start align-start">
          <div class="text-h6 font-weight-medium">
            {{ credit.holderName }}
          </div>
          <div v-if="credit.name != undefined" class="secondary--text subtitle-2">
            {{ ("************" + credit.number.slice(12, 16)).replaceAll('****', "**** ")  }}
          </div>
        </div>
      </div>
      <div class="px-2">
        <v-btn v-if="removable" color="red" icon @click.stop="$emit('delete', $event)">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'PaymentCard',
  props: {
    credit: {
      type: Object,
      required: true,
    },
    background: {
      type: Boolean,
      default: true,
    },
    removable: {
      type: Boolean,
      default: true,
    }
  },
  data: () => ({
    creditImg: {
      visa: 'https://www.brandbuffet.in.th/wp-content/uploads/2022/01/New-Iconic-Visa-Brand.png',
      'master card':
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/800px-Mastercard_2019_logo.svg.png',
    },
  }),
}
</script>
