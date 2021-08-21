import test from 'ava'
import { shallowMount } from '@vue/test-utils'
import SystemInformation from '@/components/SystemInformation.vue'

// // available wrapper methods/properties: https://vue-test-utils.vuejs.org/api/wrapper
let wrapper

test.beforeEach(() => {
  // available mount options: https://vue-test-utils.vuejs.org/api/options.html
  wrapper = shallowMount(SystemInformation)
})

test('Should read external file from resources directory', t => {
  const text = wrapper.find('.title').text()
  t.true(text.includes('Information'))
})
