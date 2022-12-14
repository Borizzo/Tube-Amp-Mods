const partlist={template:`
<div>

<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
 Add Partlist
</button>

<table class="table table-striped">
<thead>
    <tr>
        <th>
            
            <div class="d-flex flex-row">

            <input class="form-control m-2"
                v-model="ModIDFilter"
                v-on:keyup="FilterFn()"
                placeholder="Filter">

                <button type="button" class="btn btn-light"
                @click="sortResult('ModID',true)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
                </button>

                <button type="button" class="btn btn-light"
                @click="sortResult('ModID',false)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
                </button>
            </div>
            Mod ID
        </th>
        <th>

            <div class="d-flex flex-row">

            <input class="form-control m-2"
                v-model="ModNameFilter"
                v-on:keyup="FilterFn()"
                placeholder="Filter">
                
                <button type="button" class="btn btn-light"
                @click="sortResult('ModName',true)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
                </button>

                <button type="button" class="btn btn-light"
                @click="sortResult('ModName',false)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
                </button>

            </div>
            Mod Name
        </th>
        <th>
            Partlist Name
            </th>
        <th>
            Options
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="dep in partlists">
        <td>{{dep.ModID}}</td>
        <td>{{dep.ModName}}</td>
        <td>{{dep.PartlistName}}</td>
        <td>
            <button type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(dep)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <button type="button" @click="deleteClick(dep.ModID)"
            class="btn btn-light mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

        </td>
    </tr>
</tbody>
</thead>
</table>

<div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>

    <div class="modal-body">

    <div class="input-group mb-3">
    <span class="input-group-text">Mod ID</span>
    <input type="text" class="form-control" v-model="ModID">
</div>
        <div class="input-group mb-3">
            <span class="input-group-text">Mod ID</span>
            <input type="text" class="form-control" v-model="ModID">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Mod Name</span>
            <input type="text" class="form-control" v-model="ModName">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Partlist Name</span>
            <input type="text" class="form-control" v-model="PartlistName">
        </div>

        <button type="button" @click="createClick()"
         class="btn btn-primary">
        Create
        </button>
        <button type="button" @click="updateClick()"
        v-if="ModID!=0" class="btn btn-primary">
        Update
        </button>

    </div>

</div>
</div>
</div>


</div>


`,

data(){
    return{
        partlists:[],
        modalTitle:"",
        ModName:"",
        ModID:"",
        PartlistName:"",
        ModNameFilter:"",
        ModIdFilter:"",
        partlistsWithoutFilter:[]
    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"/partlist")
        .then((response)=>{
            this.partlists=response.data;
            this.partlistsWithoutFilter=response.data;
        });
    },
    addClick(){
        this.modalTitle="Add Partlist";
        this.ModID="";
        this.ModName="";
        this.PartlistName="";
    },
    editClick(dep){
        this.modalTitle="Edit Partlist";
        this.ModID=dep.ModID;
        this.ModName=dep.ModName;
        this.PartlistName=dep.PartlistName;
    },
    createClick(){
        axios.post(variables.API_URL+"/partlist",{
            ModID:this.ModID,
            ModName:this.ModName,
            PartlistName:this.PartlistName
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    updateClick(){
        axios.put(variables.API_URL+"/partlist",{
            ModID:this.ModID,
            ModName:this.ModName,
            PartlistName:this.PartlistName
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
        }
        axios.delete(variables.API_URL+"/partlist/"+id)
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });

    },
    FilterFn(){
        var ModIDFilter=this.ModIDFilter;
        var ModNameFilter=this.ModNameFilter;

        this.partlists=this.partlistsWithoutFilter.filter(
            function(el){
                return el.ModID.toString().toLowerCase().includes(
                    ModIDFilter.toString().trim().toLowerCase()
                )&&
                el.ModName.toString().toLowerCase().includes(
                    ModNameFilter.toString().trim().toLowerCase()
                )
            });
    },
    sortResult(prop,asc){
        this.partlists=this.partlistsWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        })
    }

},
mounted:function(){
    this.refreshData();
}

}