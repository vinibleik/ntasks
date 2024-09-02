type Task = {
    title: string;
};

function findAll(): Task[] {
    return [{ title: "Buy some shoes." }, { title: "Fix laptop" }];
}

export default {
    findAll,
};
