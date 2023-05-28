let context: any;
export = {
    get() {
        return context;
    },
    set(ctx: any) {
        context = ctx;
    }
};