<template>

<div class="card border border-0 mb-3" style="width: 100%">
    <div class="card-header">
        <div class="d-flex justify-content-start">
            <div class="p-1 mr-auto"> <span class="badge text-bg-category">Coding</span></div>
            <div class="p-1"><small class="text-muted">ID</small></div>
            <div class="p-1"><input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" /></div>
        </div>

    </div>
  <div class="card-body pt-1 pb-4">
    <h3 class="card-title">This is a title</h3>

   

    
    
  </div>
  <div class="card-footer clearfix">
        <span class="float-left"><p class="card-text"><small class="text-muted">21 Sept</small></p></span>
        <span class="float-left ms-3"><span class="badge text-bg-warning">Low</span></span>

        <span class="float-right"><button type="button" class="btn btn-dark"
        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"> 
        <font-awesome-icon icon="fa-regular fa-pen-to-square" />
        </button></span>
        <span class="float-right"><img src="https://via.placeholder.com/28x28"
                  alt="Generic placeholder image" class="img-fluid rounded-circle me-2"
                  style="width: 28px;"></span>
  </div>
</div>



</template>

<script>
export default {
    name: "kanbanCard"
}
</script>

<style scoped>
.card-footer, .card-header{
    border-bottom: none;
    background-color: var(--bs-card-bg);
}

.card-footer{
    border-top: 1px solid rgb(217, 217, 217);
}


.card-title{
    font-size: 16px;
}

.card-footer{
    padding: 8px 16px;
}

.card-footer-item{
    margin: 0 10px;
}

.badge{
    opacity: 0.7;
}

.badge:hover{
    opacity: 1;
    transition: 0.5s ease-in-out 100ms
}

.category{
    width: 80%;
}

.p-cat{
    display:flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    border-radius: var(--custom-border-radius);
    background-color: var(--bg-color-management);
    color:#fff;
}

.mr-auto{
    margin-right: auto;
}

.text-bg-category {
    color: #000;
    background-color: var(--bg-color-coding);
}

:deep(.fa-pen-to-square path) {
   color: #fff;
}

.form-check-input:checked {
    background-color: #4e94fb;
    border-color: #4e94fb;
}

</style>