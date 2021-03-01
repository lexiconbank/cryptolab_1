<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md full-width" >
      <q-card >
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="naming">
            <div class="text-h6">Naming Conventions</div>
                <div class="q-pa-md full-width">
                    <q-list bordered separator>
                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Functions</q-item-label>
                                <q-item-label caption>camelCase</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Variables</q-item-label>
                                <q-item-label caption>snake_case</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Global Variables </q-item-label>
                                <q-item-label caption>$_snake_case </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Boolean</q-item-label>
                                <q-item-label caption>isBoolean </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Filename</q-item-label>
                                <q-item-label caption>Pascal case - vue, classes, controller, model (PascalCase)</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Select Option</q-item-label>
                                <q-item-label caption>ex. select (country_options)</q-item-label>
                            </q-item-section>
                        </q-item>

                    </q-list>
                </div>
          </q-tab-panel>

          <q-tab-panel name="module">
            <div class="text-h6">Modules</div>
                <div class="q-pa-md full-width">
                    <q-list bordered separator>
                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Name of the modules </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Date of module creation </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Author of the module </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Synopsis of the module about the module does. </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Different function Supported </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Use Semicolon as indicator of End of line</q-item-label>
                            </q-item-section>
                        </q-item>

                    </q-list>
                </div>
          </q-tab-panel>

          <q-tab-panel name="indentation">
            <div class="text-h6">Indentation</div>
                <div class="q-pa-md full-width">
                    <q-list bordered separator>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Space after giving a comma between two function arguments .</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>Each nested block should be properly indented and spaced.</q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-ripple>
                            <q-item-section>
                                <q-item-label>All braces should start from a new line and the code following the end of braces also start from a new line. </q-item-label>
                            </q-item-section>
                        </q-item>

                    </q-list>
                </div>
          </q-tab-panel>
        </q-tab-panels>

        <q-separator />

        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-3"
          align="justify"
          narrow-indicator
        >
          <q-tab name="naming" label="Naming" />
          <q-tab name="module" label="Modules" />
          <q-tab name="indentation" label="Indentations" />
        </q-tabs>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 'naming'
    }
  }
}
</script>

<style>

</style>