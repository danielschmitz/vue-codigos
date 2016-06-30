
export const eventMixin = {
    created:function(){
        console.log(`[${this.$options.name}] created`);
    }
}
