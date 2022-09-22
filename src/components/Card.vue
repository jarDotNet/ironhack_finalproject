<template>

<div class="card border border-0" style="width: 20rem;">
    <div class="card-header clearfix">
        <span class="float-left">Category</span>
        <span class="float-right">ID</span>
    </div>
  <div class="card-body">
    <h5 class="card-title">This is a title</h5>
    
    
  </div>
  <div class="card-footer clearfix">
        <span class="float-left"><p class="card-text"><small class="text-muted">21 Sept</small></p></span>
        <span class="float-left ms-3"><span class="badge text-bg-warning">Low Priority</span></span>

        <span class="float-right"><button type="button" class="btn btn-info"
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
    border-top: none;
    border-bottom: none;
    background-color: var(--bs-card-bg);
}

.card-title h3{
    font-size: 20px;
}

.card-footer{
    padding: 8px 16px;
}

.card-footer-item{
    margin: 0 10px;
}

.badge:hover{
    opacity: 0.7;
    transition: 0.5s ease-in-out 100ms
}


</style>