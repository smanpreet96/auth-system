exports.adminView = (req, res) => {
    res.status(200).send([{ isAdmin: true, isEditor: true }]).end();
};

exports.editorView = (req, res) => {
    res.status(200).send([{ isAdmin: false, isEditor: true }]).end();
};