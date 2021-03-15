export default
{
    data: () =>
    ({
        $user_info: "",
    }),

    computed:
    {
    },
    created()
    {
    },
    mounted()
    {
    },

    methods:
    {
        async $_post(url, data)
        {
            alert(url + ' : ' + data);
            return await this.$axios.post(url, data).catch((e) =>
            {
                this.$q.dialog({ title: `Something's not quite right`, message: e.response.data.message });
                this.$q.notify({
                    message: '<div style="color: red; font-weight: bold;"><i class="fas fa-exclamation-triangle" style="margin-right: 10px;"></i>' + error.response.data.message + '</div>',
                    position: 'top',
                    color: 'white',
                    html: true
                });
            });
        },

        async $_get(url)
        {
            return await this.$axios.get(url, data).catch((e) =>
            {
                this.$q.dialog({ title: `Something's not quite right`, message: e.response.data.message });
            });
        },

    }
}