import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import appInstance from '../app';

chai.use(chaiHttp)

describe("functional requirements", () => {
    let todo_list_id = '';
    let todo_item_id = '';
    it("can create a List => POST /todo/lists/create", async () => {
        const app = await appInstance;
        const res = await chai
            .request(app)
            .post('/todo/list/create')
            .send({
                "name": "mocha_test_name_func"
            })
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.todo_list_id).to.not.equal(null);
        todo_list_id = res.body.data.todo_list_id;
    });

    it("can get all Lists => GET /todo/lists", async () => {
        const app = await appInstance;
        const res = await chai
            .request(app)
            .get('/todo/lists')
            .send()
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
    });

    it("can get a List => GET /todo/lists/:todo_list_id", async () => {
        const app = await appInstance;
        const res = await chai
            .request(app)
            .get(`/todo/list/${todo_list_id}`)
            .send()
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
    });

    it("can update the name of a List => PUT /todo/list/update-name/:todo_list_id", async () => {
        const toUpdate = "mocha_test_updated";
        const app = await appInstance;
        const res = await chai
            .request(app)
            .put(`/todo/list/update-name/${todo_list_id}`)
            .send({
                "name": toUpdate
            })
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.name).to.equal(toUpdate);
    });

    it("can create an Item for a list => POST /todo/item/create/:todo_list_id", async () => {
        const app = await appInstance;
        const res = await chai
            .request(app)
            .post(`/todo/item/create/${todo_list_id}`)
            .send({
                "description": "mocha_test_description_func"
            })
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.todo_list_id).to.not.equal(null);
        todo_item_id = res.body.data.todo_item_id;
    });

    it("can get all Items of a List => GET /todo/items/:todo_list_id", async () => {
        const app = await appInstance;
        const res = await chai
            .request(app)
            .get(`/todo/items/${todo_list_id}`)
            .send()
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
    });

    it("can get an Item of a List => GET /todo/item/:todo_list_id/:todo_item_id", async () => {
        const app = await appInstance;
        const res = await chai
            .request(app)
            .get(`/todo/item/${todo_list_id}/${todo_item_id}`)
            .send()
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
    });

    it("can update the description of an Item for a List => PUT /todo/item/update-description/:todo_list_id/:todo_item_id", async () => {
        const toUpdate = "mocha_test_updated";
        const app = await appInstance;
        const res = await chai
            .request(app)
            .put(`/todo/item/update-description/${todo_list_id}/${todo_item_id}`)
            .send({
                "description": toUpdate
            })
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.description).to.equal(toUpdate);
    });

    it("can update the checked status of an Item for a List => PUT /todo/item/update-checked/:todo_list_id/:todo_item_id", async () => {
        const toUpdate = true;
        const app = await appInstance;
        const res = await chai
            .request(app)
            .put(`/todo/item/update-checked/${todo_list_id}/${todo_item_id}`)
            .send({
                "checked": toUpdate
            })
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.checked).to.equal(toUpdate);
    });

    it("can delete an Item of a List => DELETE /todo/item/delete/:todo_list_id/:todo_item_id", async () => {
        const app = await appInstance;
        const res = await chai
            .request(app)
            .delete(`/todo/item/delete/${todo_list_id}/${todo_item_id}`)
            .send()
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data).to.equal(true);
    });

    it("can delete a List => DELETE /todo/list/delete/:todo_list_id", async () => {
        const app = await appInstance;
        const res = await chai
            .request(app)
            .delete(`/todo/list/delete/${todo_list_id}`)
            .send()
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data).to.equal(true);
    });
});
