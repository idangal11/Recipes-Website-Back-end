router.post('/rooms/:roomId/status', async (req, res, next) => {
    try{
        const { roomId } = req.params;
        const { status_id } = req.body;
      
        await departments_utils.updateStatus(roomId, status_id);
        res.status(200).send({ message: "Status successfully updated" });
    } catch(error){
        next(error); // ensure you have error handling middleware set up
    }
});

router.post('/rooms/:roomId/tvs', async (req, res, next) => {
    try{
        const { roomId } = req.params;
        const { num_of_tv } = req.body;
      
        await departments_utils.updateNumOfTvs(roomId, num_of_tv);
        res.status(200).send({ message: "Num of TVs successfully updated" });
    } catch(error){
        next(error);
    }
});

router.post('/rooms/:roomId/subscribers', async (req, res, next) => {
    try{
        const { roomId } = req.params;
        const { num_of_subscribers } = req.body;
      
        await departments_utils.updateNumOfSubscribers(roomId, num_of_subscribers);
        res.status(200).send({ message: "Num of Subscribers successfully updated" });
    } catch(error){
        next(error);
    }
});


router.get('/department/:departmentId', async (req, res, next) => {
    try {
        const { departmentId } = req.params;
        
        // Validate departmentId (e.g., check if it's a number)

        // Fetch department data along with all its rooms.
        const departmentData = await departments_utils.getDepartmentWithRooms(departmentId);
        
        // Check if department data is found.
        if(!departmentData) {
            return res.status(404).send({ message: 'Department not found' });
        }

        res.status(200).send(departmentData);
    } catch (error) {
        next(error); 
    }
});
