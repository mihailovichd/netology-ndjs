1. insertMany([
    {
        title: "1",
        description: "string",
        authors: "string"
    },
    {
        title: "2",
        description: "string",
        authors: "string"
    },
])

2. find({ title: example })

3. updateOne(
    { _id: value },
    { $set: { "desc": "desc", "authors": "authors" } }
)