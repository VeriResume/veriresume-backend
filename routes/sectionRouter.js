const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Sections = require('../models/sections');

const sectionRouter = express.Router();

sectionRouter.use(bodyParser.json());

sectionRouter.route('/')
.get((req,res,next) => {
    Sections.find({}).sort({_id : 1})
    .then((sections) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(sections);
    }, (err) => next(err))
    .catch((err) => next(err));
}) //Gets all sections
.post((req, res, next) => {
    Sections.create(req.body)
    .then((section) => {
        console.log('Section Created ', section);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(section);
    }, (err) => next(err))
    .catch((err) => next(err));
}) //Add new section
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('Cannot delete all sections');    
}); 

sectionRouter.route('/:sectionID')
.get((req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on sections');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on sections');
})
.put((req, res, next) => {
    Sections.findByIdAndUpdate(req.params.sectionID, {
        $set: req.body
    }, { new: true })
    .then((section) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(section);
    }, (err) => next(err))
    .catch((err) => next(err));
}) //updates section
.delete((req, res, next) => {
    Sections.findByIdAndRemove(req.params.sectionID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err)); //removes bad section
});

sectionRouter.route('/:sectionID/experiences')
.get((req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on experiences');
})
.post((req, res, next) => {
    Sections.findById(req.params.sectionID)
    .then((section) => {
        if (section != null) {
            section.experiences.push(req.body);
            section.save()
            .then((section) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(section);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Section ' + req.params.sectionID + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}) //Adds an experience to section
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /section/' + req.params.sectionID + '/experiences');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('All experiences cannot be deleted');    
});

sectionRouter.route('/:sectionID/:experienceID')
.get((req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on sections');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on sections');
}) 
.put((req, res, next) => {
    Sections.findById(req.params.sectionID)
    .then((section) => {
        if (section != null && section.experiences.id(req.params.experienceID) != null) {
            if (req.body.place) {
                section.experiences.id(req.params.experienceID).place = req.body.place;
            }
            if (req.body.verifiable_elements) {
                section.experiences.id(req.params.experienceID).verifiable_elements = req.body.verifiable_elements;                
            }
            section.save()
            .then((section) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(section);                
            }, (err) => next(err));
        }
        else if (section == null) {
            err = new Error('section ' + req.params.sectionID + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.experienceID + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}) //Update experiences
.delete((req, res, next) => {
    Sections.findById(req.params.sectionID)
    .then((section) => {
        if (section != null) {
            section.experiences.id(req.params.experienceID).remove();
            
            section.save()
            .then((section) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(section);                
            }, (err) => next(err));
        }
        else {
            err = new Error('section ' + req.params.sectionID + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));    
}); //removes bad experience


sectionRouter.route('/:sectionID/:experienceID/verielement')
.get((req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on experiences');
})
.post((req, res, next) => {
    Sections.findById(req.params.sectionID)
    .then((section) => {
        if (section != null) {
            section.experiences.id(req.params.experienceID).verifiable_elements.push(req.body);
            section.save()
            .then((section) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(section);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Section ' + req.params.sectionID + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}) //Adds an verielement to experience
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /section/' + req.params.sectionID + '/experiences');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('All experiences cannot be deleted');    
});

sectionRouter.route('/:sectionID/:experienceID/:verielementID')
.get((req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on experiences');
})
.post((req, res, next) => {
    Sections.findById(req.params.sectionID)
    .then((section) => {
        if (section != null) {
            section.experiences.id(req.params.experienceID).verifiable_elements.id(req.params.verielementID).tag = req.body.tag;
            section.experiences.id(req.params.experienceID).verifiable_elements.id(req.params.verielementID).public = req.body.public;
            section.experiences.id(req.params.experienceID).verifiable_elements.id(req.params.verielementID).verified = req.body.verified;
            section.save()
            .then((section) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(section);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Section ' + req.params.sectionID + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
//update specific verielement
.delete((req, res, next) => {
    Sections.findById(req.params.sectionID)
    .then((section) => {
        if (section != null && section.experiences.id(req.params.experienceID) != null) {
            section.experiences.id(req.params.experienceID).verifiable_elements.id(req.params.verielementID).remove();
            section.save()
            .then((section) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(section);                
            }, (err) => next(err));
        }
        else if (section == null) {
            err = new Error('Section ' + req.params.sectionID + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Experiences ' + req.params.experienceID + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
}); //delete specific verielement


module.exports = sectionRouter;