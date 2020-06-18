<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ name }}</h2>
    <input type="text" placeholder="请输入新特性" @keyup.enter="addFeature" />
    <ul>
      <li v-for="item in city" :key="item.id">{{ item.name }}</li>
    </ul>
    <span
      >{{ $store.state.Root.count }} -- {{ Root.count }} ----
      {{ Root.info }}</span
    >
    <br />
    <i>{{ Root.doubleCount }}</i>
    <!-- <button @click="$store.commit('Root/addCount', 1)">click</button> -->
    <br />
    <button @click="Root.addCount(2)">click</button>
    <button @click="Root.syncAddCount(10)">syncClick</button>
    <hr />
    <span
      >{{ $store.state.Log.count }} -- {{ Log.count }} ---- {{ Log.info }}</span
    >
    <br />
    <i>{{ Log.doubleCount }}</i>
    <br />
    <button @click="Log.addCount(1)">click</button>
    <button @click="Log.syncAddCount(5)">syncClick</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import store from '../store'

type Foo = {
  str: string
  num: number
}
interface Options {
  id: number | string
  name: string
}

type Merge = Foo & Options

interface Result<T> {
  ok: number
  data: T
}

function InjectStore(module: string | Array<string>): Function {
  return function(target: Function) {
    function mapKeys(obj: any, stack: any, module: string, type?: string) {
      Object.keys(obj).map(item => {
        const isState = !item.includes('/')
        if (!isState && !item.startsWith(module)) {
          return
        }
        let key = isState ? item : item.split('/')[1]
        stack[key] = !type
          ? () => obj[item]
          : (n: number) => store[type](item, n)
      })
    }
    if (typeof module === 'string') {
      module = [module]
    }
    module.forEach(m => {
      const state = store.state[m]
      const { getters, _mutations, _actions } = store as any
      const gatherGetters: any = {}
      const gatherMethods: any = {}
      mapKeys(state, gatherGetters, m)
      mapKeys(getters, gatherGetters, m)
      mapKeys(_mutations, gatherMethods, m, 'commit')
      mapKeys(_actions, gatherMethods, m, 'dispatch')
      target.prototype[m] = new Vue({
        computed: {
          ...gatherGetters
        },
        methods: {
          ...gatherMethods
        }
      })
    })
  }
}
// @InjectStore('Root')
@InjectStore(['Root', 'Log'])
@Component
export default class HelloWorld extends Vue {
  // props， private：私有属性，不能在类的外部访问， !称为明确赋值断⾔，它是提供给ts的
  // Props()参数是为vue提供属性选项
  @Prop({ required: true, type: String }) private msg!: string
  // data，protected：保护属性，可以在子类中访问
  protected name: string = 'lin'
  foo: Foo = {
    str: 'foo',
    num: 1
  }
  city: Options[] = [
    {
      id: 1,
      name: '北京'
    }
  ]
  weather: Array<Options> = [
    {
      id: 1,
      name: '晴'
    },
    {
      id: '2',
      name: '多云'
    }
  ]
  merge: Merge = {
    id: 1,
    str: 'str',
    name: 'lin',
    num: 1
  }
  // computed
  get cityCount(): number {
    return this.city.length
  }

  // 生命周期
  created() {
    console.log('created...')
    this.gatherMsg().then(res => console.log(res))
    this.getResult<string>('泛型，使用的时候再指定类型')
    // 类型推断T为number
    this.getResult(1)
    console.log(this.constructor.prototype)
  }
  async mounted() {
    await this.changeName('bin')
  }
  // methods
  changeName(name: string): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.name = name
        resolve('hi')
      }, 1000)
    })
  }
  gatherMsg(msg?: string) {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() * 100 > 50) {
          resolve('hi')
        } else {
          reject(0)
        }
      }, 1000)
    })
  }
  greet(person: string): string {
    return 'hello' + person
  }
  overload(cb1: () => void, cb2?: (v1: number, v2: string) => string): string {
    if (cb1 && cb2) {
      cb2(1, '3')
    } else {
      cb1()
    }
    return 'overload'
  }
  addFeature(e: KeyboardEvent) {
    // e.target是EventTarget类型，需要断言为HTMLInputElement
    const inp = e.target as HTMLInputElement
    const feature: Options = {
      id: this.cityCount + 1,
      name: inp.value
    }
    this.city.push(feature)
    inp.value = ''
  }
  getResult<T>(data: T): Result<T> {
    return { ok: 1, data }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
