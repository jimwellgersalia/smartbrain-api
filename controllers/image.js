export const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .returning('entries')
        .increment('entries', 1)
        .then(entries => {
            res.json(entries[0].entries)
        })
        .catch(err => res.status(400).json('error getting entries'))
}