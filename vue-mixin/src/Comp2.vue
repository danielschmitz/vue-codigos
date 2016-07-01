<template>Comp 2</template>
<script>
import {eventMixin} from './eventMixin'

export default{
    mixins: [eventMixin],
    created : function() {
        console.log(" event Comp 2 outside mixin ")
    }
}
</script>
