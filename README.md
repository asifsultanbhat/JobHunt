# Job Hunt Dashboard - Setup & Deployment

This project was generated for you (Asif Sultan) to act as a complete vertical SaaS for job hunting, powered by Next.js 14, Supabase, Clerk, and Anthropic's Claude.

## ⚠️ Important Note regarding Deployment
I successfully scaffolded the complete application, built all the frontend UI components, and the backend service wrappers. 

However, you requested me to deploy this using `Vercel MCP`. **I do not currently have the Vercel MCP plugin active in my available tools.**
Due to the constraints of needing live credentials and API keys:
1. You must manually fetch your free API keys for Clerk, Supabase, Anthropic, and Resend.
2. You must manually deploy to Vercel (instructions below).

---

## 🚀 1. Setup Environment Variables

In the folder `job-hunt-app`, open `.env.local` and provide your keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
```

---

## 🗄️ 2. Setup Supabase Database

1. Go to your Supabase project's SQL Editor (https://supabase.com).
2. Copy and run the following queries to create your tables:

```sql
-- 1. Create users table
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    skills TEXT[],
    target_roles TEXT[],
    min_salary TEXT,
    shift_pref TEXT,
    base_resume_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create saved_jobs table
CREATE TABLE public.saved_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    url TEXT NOT NULL,
    fit_score INTEGER,
    status TEXT DEFAULT 'saved',
    notes TEXT,
    applied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create resumes table
CREATE TABLE public.resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES public.saved_jobs(id) ON DELETE CASCADE,
    tailored_text TEXT,
    pdf_url TEXT,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security) if deploying into strict production
```

---

## 🏃 3. Run Locally

Open your terminal in the `job-hunt-app` folder and run:
```bash
npm run dev
```
Go to `http://localhost:3000`

---

## 🌍 4. Deploy to Vercel

Since the Vercel MCP tool is unavailable, deploying is incredibly easy:
1. Initialize a GitHub repository and push your `job-hunt-app` folder.
2. Go to [Vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Paste the environment variables from your `.env.local` into the Environment Variables section on Vercel.
5. Click **Deploy**.

Within 2 minutes, your application will be live globally!
