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
            return await this.$axios.post(url, data).catch((e) =>
            {
                this.$q.dialog({ title: `Something's not quite right`, message: e.response.data.message });
            });
        },

        async $_get()
        {
            return await this.$axios.get(url, data).catch((e) =>
            {
                this.$q.dialog({ title: `Something's not quite right`, message: e.response.data.message });
            });
        },

    }
}