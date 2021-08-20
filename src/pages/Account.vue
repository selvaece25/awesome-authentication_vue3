<template>
  <div class="container">
    <h3>My Account</h3>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elitetus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo.</p>
    <ul class="nav nav-tabs">
      <router-link  to="/account/user" active-link="active" active-class="active" class="px-2">User</router-link>
      <router-link to="/account/profile" active-class="active" class="px-2" >Profile</router-link>
    </ul>
    <router-view></router-view>
    <div class="tab-content"></div>
  </div>
</template>
