<template>
   <div>
        <div v-if="users_list.length > 0">
            <ul>
                <li v-for="user in users_list" :key="user.id">
                    {{ user.fullname  }}
                </li>
            </ul>
        </div>
        <div class="text-center" v-else>
            <q-spinner color="primary" size="3em"/>
        </div>
   </div>
</template>

<script>
import { postUserList } from '../references/url';

export default
{
   data:() =>
   ({
        users_loading: true,
        users_list: [],
   }),
    mounted()
    {
        this.getUsers();
    },
   methods:
   {
        getUsers()
        {
            //this.$q.loading.show();
            setTimeout(() =>
            {
                this.$axios.post(postUserList).then((response) =>
                {
                    // this.$q.notify(JSON.stringify(response.data))
                    this.users_list = response.data;
                    // this.$q.loading.hide();
                }).catch((e) =>
                {
                    this.$q.notify(e.message);
                    // this.$q.loading.hide();
                }) 
            }, 1000)

        }
   },
}
</script>