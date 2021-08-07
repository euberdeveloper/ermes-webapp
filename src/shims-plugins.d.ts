import { Validator } from '@/plugins/validator';


declare module 'vue/types/vue' {
    import Vue from 'vue';

    interface Vue {
        $validator: Validator;
    }
}