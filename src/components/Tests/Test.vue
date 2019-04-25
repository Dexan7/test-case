<template>
  <div>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <h1>Приветствуем на странице теста</h1>
            <h3>Пожалуйста приступайте:</h3>
            
            <div v-for="(block, key1) in blocks" :key="key1" :id="block.el" :style="{display: block.status}">
              <v-radio-group v-model="radioGroup">
              <h4>{{block.question}}</h4>
                <v-radio
                  v-for="(item, key2) in block.answers"
                  :key="key2"
                  :label="item.value"
                  :value="key2"
                ></v-radio>
              </v-radio-group>
            </div>

            <v-btn id="next-btn" color="info" @click="onNext()">Продолжить</v-btn>

            <div id="end" style="display:none;">
              <h3>Ваш результат {{score}} из {{rightAnswers.length}}</h3>
              <v-btn color="info" @click="startAgain">Начать заново</v-btn>
            </div>

        </v-flex>
      </v-layout>
  </v-container>
  </div>
</template>

<script>
import * as fb from 'firebase'

export default {
  data () {
    return {
      blocks: [
        {
          el: 'one',
          status: 'block',
          question: 'Что получится, если сложить true + false?',
          answers: [
            { value: 'truefalse' },
            { value: '0' },
            { value: '1+' },
            { value: 'NaN' }
          ]
        },
        {
          el: 'two',
          status: 'none',
          question: 'Что такое ECMAScript?',
          answers: [
            { value: 'Новый язык программирования.' },
            { value: 'Переработанная реализация Javascript.' },
            { value: 'Спецификация языка Javascript.+' }
          ]
        },
        {
          el: 'three',
          status: 'none',
          question: 'Какое из этих слов не имеет специального использования в JavaScript, никак не упомянуто в стандарте?',
          answers: [
            { value: 'this' },
            { value: 'parent+' },
            { value: 'instanceof' },
            { value: 'new' },
            { value: 'constructor' }
          ]
        },
        {
          el: 'four',
          status: 'none',
          question: 'Верно ли, что null == undefined?',
          answers: [
            { value: 'Да+' },
            { value: 'Нет' }
          ]
        },
        {
          el: 'five',
          status: 'none',
          question: 'Правда ли что a == b? a = [1, 2, 3]; b = [1, 2, 3];',
          answers: [
            { value: 'Правда' },
            {
              value: 'Неправда+'
            },
            {
              value: 'Как повезет'
            }
          ]
        },
        {
          el: 'six',
          status: 'none',
          question: 'Объявлена функция:function F() {} Чем является F.prototype?',
          answers: [
            {
              value: 'Обычным объектом.+'
            },
            {
              value: 'Функцией'
            },
            {
              value: 'Равен undefined.'
            }
          ]
        },
        {
          el: 'seven',
          status: 'none',
          question: 'Что выведет alert? let str = "Hello";\n str.something = 5;\n alert(str.something);?',
          answers: [
            {
              value: '5'
            },
            {
              value: 'undefined'
            },
            {
              value: 'Будет ошибка.+'
            }
          ]
        },
        {
          el: 'eight',
          status: 'none',
          question: "Чему равно a + b + c? let a = 1; let b = { toString() {return '1'} }; let c = 1;",
          answers: [
            {
              value: '11[object Object]'
            },
            {
              value: '2[object Object]'
            },
            {
              value: '111+'
            },
            {
              value: '3'
            }
          ]
        },
        {
          el: 'nine',
          status: 'none',
          question: "Что выведет этот код? alert( '1'[0] );",
          answers: [
            {
              value: 'false, false.'
            },
            {
              value: 'false, true.+'
            },
            {
              value: 'true, false.'
            },
            {
              value: 'true, true.'
            }
          ]
        },
        {
          el: 'ten',
          status: 'none',
          question: "Чему равно значение выражения 4 - '5' + 0xf - '1e1'?",
          answers: [
            {
              value: 'Цифре.'
            },
            {
              value: 'Строке.+'
            },
            {
              value: 'NaN'
            }
          ]
        }
      ],
      radioGroup: '',
      answers: [],
      rightAnswers: [2, 2, 1, 0, 1, 0, 2, 2, 1, 1],
      score: 0,
      user: '',
      test: []
    }
  },
  methods: {
    onNext () {
      this.answers.push(this.radioGroup)

      for (var key in this.blocks) {
        console.log(document.getElementById(this.blocks[key].el).style.display)
        if (document.getElementById(this.blocks[key].el).style.display === 'block') {
          document.getElementById(this.blocks[key].el).style.display = 'none'
          if (key < this.blocks.length - 1) {
            document.getElementById(this.blocks[Number(key) + 1].el).style.display = 'block'
          }
          if (this.radioGroup === this.rightAnswers[key]) {
            this.score++
          }
          console.log(key)
          if (Number(key) === Number(this.blocks.length) - 1) {
            document.getElementById('next-btn').style.display = 'none'
            document.getElementById('end').style.display = 'block'
            this.pushScoreToDb()
          }
          break
        }
      }
      this.radioGroup = ''
    },
    startAgain () {
      document.getElementById('one').style.display = 'block'
      document.getElementById('next-btn').style.display = 'block'
      document.getElementById('end').style.display = 'none'
      this.score = 0
      this.answers = []
    },
    async pushScoreToDb () {
      this.user = fb.auth().currentUser
      const userScore = {
        user: this.user.email,
        score: this.score
      }
      await fb.database().ref('scoreDb').push(userScore)
    }
  }
}
</script>

<style>
</style>