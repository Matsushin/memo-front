<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  setup(_, context: SetupContext) {
    context.root.$router.push('/memo/index')
  },
})
</script>
<
