<template>
  <div>
    <table class="table table-dark table-bordered theme--dark">
      <thead>
        <tr>
          <th class="brd">USER</th>
          <th class="brd" @click="mySort">SCORE</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="item in result" :key="item.id">
            <td class="brd">{{item.user}}</td>
            <td class="brd">{{item.score}}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import * as fb from 'firebase'

export default {
  data () {
    return {
      users: '',
      scores: '',
      result: []
    }
  },
  mounted () {
    let tabelSore = fb.database().ref('scoreDb')
    tabelSore.on('value', (item) => {
      item.forEach((element) => {
        let value = element.val()
        this.result.push(value)
        console.log('this.result', value)
        this.mySort()
      })
    })
  },
  methods: {
    getTable () {
      let tabelSore = fb.database().ref('scoreDb')
      tabelSore.on('value', (item) => {
        item.forEach((element) => {
          let value = element.val()
          this.users = value.user
          this.scores = value.score
          console.log('users', this.users)
          console.log('scores', value)
        })
      })
    },
    mySort () {
      this.result = this.result.sort((a, b) => {
        return b.score - a.score
      })
    }
  }
}
</script>

<style>
  .brd {
    border-right: 1px solid hsla(0,0%,100%,.12);
    width: 50%;
  }
</style>
