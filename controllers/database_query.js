var dbQuries = require('./modules/database_query/db_queries');

module.exports.getDatabaseQuery = function (req, res, next) {

    dbQuries.getDatabaseQuery( function(error, results) {
        if (error) {
            res.status(501).json({
                message: "Error get database query!",
                error: error
            });
        }
        res.status(200).json(results);
    });
};



module.exports.updateDatabaseQuery = function (req, res, next) {

    dbQuries.updateDatabaseQuery(function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error update database query ",
                error: error
            });
        }
        res.status(201).send("Database query is updated successfully!");
    });
};


module.exports.craeteDatabaseQuery = function (req, res, next) {

    dbQuries.craeteDatabaseQuery(function(error, result) {
        if (error) {
            res.status(501).json({
                message: "Error create database query!",
                error: error
            });
        }
        res.status(201).send("Detai is added successfully!");
    });
};