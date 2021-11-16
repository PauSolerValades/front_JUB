import Vue from "vue";
import { mount } from '@vue/test-utils'
import RegisterLogin from "../views/Pages/RegisterLogin.vue";


describe("RegisterLogin", () => {

    it('Initializes form email empty', () => {
        const vm = new Vue(RegisterLogin).$mount()
        expect(vm.addUserForm.email).toBe('')
    })

    it('Initializes form password empty', () => {
        const vm = new Vue(RegisterLogin).$mount()
        expect(vm.addUserForm.password).toBe('')
    })

});