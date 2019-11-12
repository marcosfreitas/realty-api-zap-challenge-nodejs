const router = global.router;

router.get('/status', function (req, res) {
    res.json({"working" : true});
});

module.exports = router;
