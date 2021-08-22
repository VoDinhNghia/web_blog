const { render } = require("ejs");
const method = require('./MethodController');
const controller = require('./Controller');
const upload = require("./UploadFile");

let studyOfMe = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let allMyTopic = await method.MethodGet('/api/list/topic', req.session.token);
            let allTopicInRecycle = await method.MethodGet('/api/recycle/topic-ofme', req.session.token);
            let logLogin = await method.MethodGet('/api/log/login', req.session.token);
            res.render('study_home', {
                avatar_home: data[0],
                notify: data[2],
                num_mess: data[1],
                listAlltopic: allMyTopic.data,
                recycle: allTopicInRecycle.data,
                logLogin: logLogin.data,
                ModeBG: data[5]
            });
        }
    } catch (error) {
        res.redirect('/')
    }
}

let CreateTopic = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let body = {
                "NameTopic": req.body.create_topic
            }
            let CreateMyTopic = await method.MethodPost('/api/create/topic', body, req.session.token);
            if (CreateMyTopic.status == true) {
                res.redirect('/manage/studyOfMe')
            } else {
                res.send({ message: CreateMyTopic.message })
            }
        }
    } catch (error) {
        res.redirect('/')
    }
}

let UpdateTopic = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let body = {
                "IdDesc": req.body.id_description,
                "ContentDesc": req.body.content_desc
            }
            let updateDesc = await method.MethodPost('/api/description/topic', body, req.session.token);
            if (updateDesc.status == true) {
                res.redirect('/manage/studyOfMe')
            } else {
                res.send({ message: updateDesc.message })
            }
        }
    } catch (error) {
        res.redirect('/')
    }
}

let DeleteTopic = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let deleteTopic = await method.MethodDelete('/api/delete/topic/' + req.params.id, req.session.token);
            if (deleteTopic.status == true) {
                res.redirect('/manage/studyOfMe')
            } else {
                res.send({ message: deleteTopic.message })
            }
        }
    } catch (error) {
        res.redirect('/')
    }
}

let RestoreTopic = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let restoreTopic = await method.MethodGet('/api/restore/topic/' + req.params.id, req.session.token);
            if (restoreTopic.status == true) {
                res.redirect('/manage/studyOfMe')
            } else {
                res.send({ message: restoreTopic.message })
            }
        }
    } catch (error) {
        res.redirect('/')
    }
}

let DetailTopic = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let listAllproblem = await method.MethodGet('/api/list/problem/' + req.params.id, req.session.token);
            let infoTopic = await method.MethodGet('/api/info/topic/' + req.params.id, req.session.token);
            let allTopicInRecycle = await method.MethodGet('/api/recycle/topic-ofme', req.session.token);
            let logLogin = await method.MethodGet('/api/log/login', req.session.token);
            res.render('study_detail_topic', {
                avatar_home: data[0],
                notify: data[2],
                num_mess: data[1],
                InfoTopic: infoTopic.data,
                listAllproblem: listAllproblem.data,
                recycle: allTopicInRecycle.data,
                logLogin: logLogin.data,
                ModeBG: data[5]
            });
        }
    } catch (error) {
        res.redirect('/')
    }
}

let CreateProlem = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let body = {
                "IdTopic": req.body.id_topic,
                "ContentProblem": req.body.problem
            }
            let CreateMyTopic = await method.MethodPost('/api/create/problem', body, req.session.token);
            if (CreateMyTopic.status == true) {
                res.redirect(`/topic/ofMe/${req.body.id_topic}`);
            } else {
                res.send({ message: CreateMyTopic.message })
            }
        }
    } catch (error) {
        res.redirect('/')
    }
}

let DetailProblem = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let listAllSolution = await method.MethodGet('/api/list/solution/' + req.params.id, req.session.token);
            let infoProblem = await method.MethodGet('/api/info/problem/' + req.params.id, req.session.token);
            let allTopicInRecycle = await method.MethodGet('/api/recycle/topic-ofme', req.session.token);
            let logLogin = await method.MethodGet('/api/log/login', req.session.token);
            res.render('study_detail_problem', {
                avatar_home: data[0],
                notify: data[2],
                num_mess: data[1],
                infoProblem: infoProblem.data,
                listAllSolution: listAllSolution.data,
                recycle: allTopicInRecycle.data,
                logLogin: logLogin.data,
                ModeBG: data[5]
            });
        }
    } catch (error) {
        res.redirect('/')
    }
}

let CreateSolution = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let body = {
                "IdProblem": req.body.id_problem,
                "ContentSolution": req.body.solution
            }
            let CreateMyTopic = await method.MethodPost('/api/create/solution', body, req.session.token);
            if (CreateMyTopic.status == true) {
                res.redirect(`/solution/for-problem/${req.body.id_problem}`);
            } else {
                res.send({ message: CreateMyTopic.message })
            }
        }
    } catch (error) {
        res.redirect('/')
    }
}

let DeleteSolution = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let deletSolution = await method.MethodDelete('/api/delete/solution/' + req.params.id, req.session.token);
            if (deletSolution.status == true) {
                res.redirect(`/solution/for-problem/${req.params.idproblem}`);
            } else {
                res.send({ message: deletSolution.message })
            }
        }
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}

let DeleteProblem = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let deleteProblem = await method.MethodDelete(`/api/delete/problem/${req.params.id}`, req.session.token);
            if (deleteProblem.status == true) {
                res.redirect(`/topic/ofMe/${req.params.idtopic}`);
            } else {
                res.send({ message: deleteProblem.message })
            }
        }
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}

let DestroyTopic = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let deleteTopic = await method.MethodDelete(`/api/destroy/topic/${req.params.id}`, req.session.token);
            if (deleteTopic.status == true) {
                res.redirect('/manage/studyOfMe');
            } else {
                res.send({ message: deleteTopic.message })
            }
        }
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}

let Mybook = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let allTopicInRecycle = await method.MethodGet('/api/recycle/topic-ofme', req.session.token);
            let logLogin = await method.MethodGet('/api/log/login', req.session.token);
            res.render('study_mybook', {
                avatar_home: data[0],
                notify: data[2],
                num_mess: data[1],
                recycle: allTopicInRecycle.data,
                logLogin: logLogin.data,
                ModeBG: data[5]
            });
        }
    } catch (error) {
        res.redirect('/')
    }
}

let googleSchoolar = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let allTopicInRecycle = await method.MethodGet('/api/recycle/topic-ofme', req.session.token);
            let logLogin = await method.MethodGet('/api/log/login', req.session.token);
            res.render('study_google_scholar', {
                avatar_home: data[0],
                notify: data[2],
                num_mess: data[1],
                recycle: allTopicInRecycle.data,
                logLogin: logLogin.data,
                ModeBG: data[5]
            });
        }
    } catch (error) {
        res.redirect('/')
    }
}

let MySchedule = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let data = await controller.ArrayData(req.session.token);
            let allTopicInRecycle = await method.MethodGet('/api/recycle/topic-ofme', req.session.token);
            let logLogin = await method.MethodGet('/api/log/login', req.session.token);
            let myschedule = await method.MethodGet('/api/list/myschedule', req.session.token);
            res.render('study_myschedule', {
                avatar_home: data[0],
                notify: data[2],
                num_mess: data[1],
                recycle: allTopicInRecycle.data,
                logLogin: logLogin.data,
                myschedule: myschedule.data,
                ModeBG: data[5]
            });
        }
    } catch (error) {
        res.redirect('/')
    }
}

let AddSchedule = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let body = {
                "ScheduleDate": req.body.schedule_date,
                "ScheduleTime": req.body.schedule_time,
                "ScheduleContent": req.body.schedule_content
            }
            let addschedule = await method.MethodPost('/api/add/schedule', body, req.session.token)
            if (addschedule.status == true) {
                res.redirect('/myschedule');
            } else {
                res.send({ message: addschedule.message })
            }
        }
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}

let EditSchedule = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let body = {
                "ScheduleID": req.body.schedule_id,
                "ScheduleContent": req.body.schedule_content
            }
            let editschedule = await method.MethodPost('/api/edit/schedule', body, req.session.token)
            if (editschedule.status == true) {
                res.redirect('/myschedule');
            } else {
                res.send({ message: editschedule.message })
            }
        }
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}

let DeleteSchedule = async(req, res) => {
    try {
        if (!req.session.username || req.session.token == undefined) {
            res.redirect('/');
        } else {
            let deleteSchedule = await method.MethodDelete(`/api/delete/schedule/${req.params.id}`, req.session.token);
            if (deleteSchedule.status == true) {
                res.redirect('/myschedule');
            } else {
                res.send({ message: deleteSchedule.message })
            }
        }
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}

module.exports = {
    studyOfMe: studyOfMe,
    CreateTopic: CreateTopic,
    UpdateTopic: UpdateTopic,
    DeleteTopic: DeleteTopic,
    RestoreTopic: RestoreTopic,
    DetailTopic: DetailTopic,
    CreateProlem: CreateProlem,
    DetailProblem: DetailProblem,
    CreateSolution: CreateSolution,
    DeleteSolution: DeleteSolution,
    DeleteProblem: DeleteProblem,
    Mybook: Mybook,
    googleSchoolar: googleSchoolar,
    DestroyTopic: DestroyTopic,
    MySchedule: MySchedule,
    AddSchedule: AddSchedule,
    EditSchedule: EditSchedule,
    DeleteSchedule: DeleteSchedule
}