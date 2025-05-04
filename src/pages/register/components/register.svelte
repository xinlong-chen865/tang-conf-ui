<script lang="ts">
  import { api } from "@utils/api";
  import Form from "@sveltes/Form.svelte";
  import Success from "@sveltes/Success.svelte";
  import type { User } from "@utils/stores";

  let done = false;
  const register = async (data: Record<string, string>) => {
    console.log(data);

    await api<User["auth"]>({
      method: "POST",
      url: "/auth/register",
      body: {
        ...data,
        origin: window.location.origin,
      },
    });
    done = true;
  };
</script>

<svelte:head>
  <title>注册</title>
</svelte:head>

<div class="text-center">
  <h1 class="text-3xl font-bold">Create an account</h1>
  <p class="mt-2 text-gray-500">
    or,
    <a href="/login" class="text-indigo-600 font-medium"
      >login to your account</a>
  </p>
</div>
{#if done}
  <Success title="Verify your email address">
    Your account has been created, and we've sent you an email with a
    confirmation link.
  </Success>
{:else}
  <Form
    items={[
      { name: "name", label: "Name", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      {
        name: "password",
        label: "Password",
        type: "password",
        hint: "If you don't set a password, we'll email you a login link",
      },
    ]}
    submitText="Create your account"
    onSubmit={register} />
{/if}
