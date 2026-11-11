-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2026 at 09:47 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_cloudstudio`
--

-- --------------------------------------------------------

--
-- Table structure for table `auditors`
--

CREATE TABLE `auditors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `auditors`
--

INSERT INTO `auditors` (`id`, `username`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin_auditor', '$2y$12$eImiTXuWVxfM37uY4JANjOL.oDRzUVhkzvWIV.GghvIUSD8KEvfdG', NULL, '2026-11-05 12:00:00', '2026-11-05 12:00:00'),
(2, 'lead_auditor', '$2y$12$eImiTXuWVxfM37uY4JANjOL.oDRzUVhkzvWIV.GghvIUSD8KEvfdG', NULL, '2026-11-05 12:00:00', '2026-11-05 12:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `developers`
--

CREATE TABLE `developers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `developers`
--

INSERT INTO `developers` (`id`, `full_name`, `username`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Alex Mercer', 'alexm', '$2y$12$eImiTXuWVxfM37uY4JANjOL.oDRzUVhkzvWIV.GghvIUSD8KEvfdG', NULL, '2026-11-05 12:05:00', '2026-11-05 12:05:00'),
(2, 'Sarah Connor', 'sarahc', '$2y$12$eImiTXuWVxfM37uY4JANjOL.oDRzUVhkzvWIV.GghvIUSD8KEvfdG', NULL, '2026-11-05 12:10:00', '2026-11-05 12:10:00'),
(3, 'Marcus Wright', 'marcusw', '$2y$12$eImiTXuWVxfM37uY4JANjOL.oDRzUVhkzvWIV.GghvIUSD8KEvfdG', NULL, '2026-11-05 12:15:00', '2026-11-05 12:15:00');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lease_applications`
--

CREATE TABLE `lease_applications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `developer_id` bigint(20) UNSIGNED NOT NULL,
  `cluster_id` bigint(20) UNSIGNED NOT NULL,
  `months` int(11) NOT NULL,
  `monthly_nominal` decimal(12,2) NOT NULL,
  `status` enum('pending','active','declined','settled') NOT NULL DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lease_applications`
--

INSERT INTO `lease_applications` (`id`, `developer_id`, `cluster_id`, `months`, `monthly_nominal`, `status`, `notes`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 12, 400.00, 'pending', 'Dedicated training node for local LLM inference.', '2026-11-05 12:55:00', '2026-11-05 12:55:00');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_11_05_000001_create_auditors_table', 1),
(5, '2026_11_05_000002_create_developers_table', 1),
(6, '2026_11_05_000003_create_validations_table', 1),
(7, '2026_11_05_000004_create_pages_table', 1),
(8, '2026_11_05_000005_create_templates_table', 1),
(9, '2026_11_05_000006_create_template_fields_table', 1),
(10, '2026_11_05_000007_create_page_sections_table', 1),
(11, '2026_11_05_000008_create_section_field_values_table', 1),
(12, '2026_11_05_000009_create_server_clusters_table', 1),
(13, '2026_11_05_000010_create_lease_applications_table', 1),
(14, '2026_11_05_000011_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `developer_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `developer_id`, `title`, `slug`, `is_published`, `created_at`, `updated_at`) VALUES
(1, 1, 'Edge Gateway Cluster', 'edge-gateway-cluster', 1, '2026-11-05 12:40:00', '2026-11-05 12:50:00'),
(2, 1, 'Event Streaming Pipeline', 'event-streaming-pipeline', 0, '2026-11-05 12:45:00', '2026-11-05 12:45:00');

-- --------------------------------------------------------

--
-- Table structure for table `page_sections`
--

CREATE TABLE `page_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `page_id` bigint(20) UNSIGNED NOT NULL,
  `template_id` bigint(20) UNSIGNED NOT NULL,
  `position` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `page_sections`
--

INSERT INTO `page_sections` (`id`, `page_id`, `template_id`, `position`, `created_at`, `updated_at`) VALUES
(10, 1, 3, 1, '2026-11-05 12:42:00', '2026-11-05 12:42:00'),
(11, 1, 1, 2, '2026-11-05 12:43:00', '2026-11-05 12:43:00');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\Developer', 1, 'auth_token', '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b', '["*"]', '2026-11-05 12:30:00', NULL, '2026-11-05 12:05:00', '2026-11-05 12:30:00'),
(2, 'App\\Models\\Auditor', 1, 'auth_token', '1f2e3d4c5b6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c', '["*"]', '2026-11-05 12:35:00', NULL, '2026-11-05 12:00:00', '2026-11-05 12:35:00');

-- --------------------------------------------------------

--
-- Table structure for table `section_field_values`
--

CREATE TABLE `section_field_values` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `page_section_id` bigint(20) UNSIGNED NOT NULL,
  `template_field_id` bigint(20) UNSIGNED NOT NULL,
  `value` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `section_field_values`
--

INSERT INTO `section_field_values` (`id`, `page_section_id`, `template_field_id`, `value`, `created_at`, `updated_at`) VALUES
(1, 10, 12, '10.0.0.0/16 Virtual Private Cloud', '2026-11-05 12:44:00', '2026-11-05 12:44:00'),
(2, 10, 13, 'Dual Load Balancer Active-Passive', '2026-11-05 12:44:00', '2026-11-05 12:44:00');

-- --------------------------------------------------------

--
-- Table structure for table `server_clusters`
--

CREATE TABLE `server_clusters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` enum('bare_metal','gpu_cluster') NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 5,
  `available_months` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`available_months`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `server_clusters`
--

INSERT INTO `server_clusters` (`id`, `name`, `category`, `price`, `stock`, `available_months`, `created_at`, `updated_at`) VALUES
(1, 'AMD EPYC 9654 Dual 192-Core Dedicated', 'bare_metal', 2400.00, 4, '[6, 12, 24]', '2026-11-05 10:00:00', '2026-11-05 10:00:00'),
(2, 'Intel Xeon Platinum 8480+ High-Memory Node', 'bare_metal', 1800.00, 3, '[6, 12, 24, 36]', '2026-11-05 10:00:00', '2026-11-05 10:00:00'),
(3, 'NVIDIA A100 4x SXM4 80GB GPU Pod', 'gpu_cluster', 3600.00, 2, '[6, 12, 24]', '2026-11-05 10:00:00', '2026-11-05 10:00:00'),
(4, 'NVIDIA H100 8x SXM5 Cluster', 'gpu_cluster', 4800.00, 2, '[6, 12, 24, 36]', '2026-11-05 10:00:00', '2026-11-05 10:00:00'),
(5, 'NVIDIA RTX 4090 8x Inference Rig', 'gpu_cluster', 1200.00, 0, '[6, 12]', '2026-11-05 10:00:00', '2026-11-05 10:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Virtual Network Architecture', 'vnet-arch', '2026-11-05 11:00:00', '2026-11-05 11:00:00'),
(2, 'Compute Instance Pool', 'compute-pool', '2026-11-05 11:00:00', '2026-11-05 11:00:00'),
(3, 'Load Balancer & Edge Proxy', 'lb-edge-proxy', '2026-11-05 11:00:00', '2026-11-05 11:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `template_fields`
--

CREATE TABLE `template_fields` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `template_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `type` enum('text','ipv4_cidr','port','url') NOT NULL DEFAULT 'text',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `template_fields`
--

INSERT INTO `template_fields` (`id`, `template_id`, `name`, `slug`, `type`, `created_at`, `updated_at`) VALUES
(10, 1, 'VPC Subnet CIDR', 'subnet-cidr', 'ipv4_cidr', '2026-11-05 11:05:00', '2026-11-05 11:05:00'),
(11, 1, 'Gateway Router IP', 'gateway-ip', 'text', '2026-11-05 11:05:00', '2026-11-05 11:05:00'),
(12, 3, 'Private Cloud Subnet', 'private-cloud-subnet', 'ipv4_cidr', '2026-11-05 11:05:00', '2026-11-05 11:05:00'),
(13, 3, 'Load Balancer Profile', 'lb-profile', 'text', '2026-11-05 11:05:00', '2026-11-05 11:05:00'),
(14, 3, 'Health Check Endpoint', 'health-check-url', 'url', '2026-11-05 11:05:00', '2026-11-05 11:05:00'),
(15, 3, 'Ingress Service Port', 'ingress-port', 'port', '2026-11-05 11:05:00', '2026-11-05 11:05:00');

-- --------------------------------------------------------

--
-- Table structure for table `validations`
--

CREATE TABLE `validations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `developer_id` bigint(20) UNSIGNED NOT NULL,
  `auditor_id` bigint(20) UNSIGNED DEFAULT NULL,
  `github_url` varchar(255) NOT NULL,
  `tech_stack` text NOT NULL,
  `monthly_income` decimal(12,2) NOT NULL,
  `status` enum('pending','accepted','declined') NOT NULL DEFAULT 'pending',
  `auditor_notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `validations`
--

INSERT INTO `validations` (`id`, `developer_id`, `auditor_id`, `github_url`, `tech_stack`, `monthly_income`, `status`, `auditor_notes`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'https://github.com/alexmercer', 'Kubernetes, Go, Rust, Terraform', 4500.00, 'accepted', 'All requirements verified and approved.', '2026-11-05 12:20:00', '2026-11-05 12:30:00'),
(2, 2, NULL, 'https://github.com/sarahconnor', 'Docker, Python, PyTorch', 3200.00, 'pending', NULL, '2026-11-05 12:35:00', '2026-11-05 12:35:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auditors`
--
ALTER TABLE `auditors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auditors_username_unique` (`username`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `developers`
--
ALTER TABLE `developers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `developers_username_unique` (`username`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lease_applications`
--
ALTER TABLE `lease_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lease_applications_developer_id_foreign` (`developer_id`),
  ADD KEY `lease_applications_cluster_id_foreign` (`cluster_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_slug_unique` (`slug`),
  ADD KEY `pages_developer_id_foreign` (`developer_id`);

--
-- Indexes for table `page_sections`
--
ALTER TABLE `page_sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `page_sections_page_id_foreign` (`page_id`),
  ADD KEY `page_sections_template_id_foreign` (`template_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `section_field_values`
--
ALTER TABLE `section_field_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_field_values_page_section_id_foreign` (`page_section_id`),
  ADD KEY `section_field_values_template_field_id_foreign` (`template_field_id`);

--
-- Indexes for table `server_clusters`
--
ALTER TABLE `server_clusters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `templates_slug_unique` (`slug`);

--
-- Indexes for table `template_fields`
--
ALTER TABLE `template_fields`
  ADD PRIMARY KEY (`id`),
  ADD KEY `template_fields_template_id_foreign` (`template_id`);

--
-- Indexes for table `validations`
--
ALTER TABLE `validations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `validations_developer_id_foreign` (`developer_id`),
  ADD KEY `validations_auditor_id_foreign` (`auditor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auditors`
--
ALTER TABLE `auditors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `developers`
--
ALTER TABLE `developers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lease_applications`
--
ALTER TABLE `lease_applications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `page_sections`
--
ALTER TABLE `page_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `section_field_values`
--
ALTER TABLE `section_field_values`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `server_clusters`
--
ALTER TABLE `server_clusters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `template_fields`
--
ALTER TABLE `template_fields`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `validations`
--
ALTER TABLE `validations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `lease_applications`
--
ALTER TABLE `lease_applications`
  ADD CONSTRAINT `lease_applications_cluster_id_foreign` FOREIGN KEY (`cluster_id`) REFERENCES `server_clusters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lease_applications_developer_id_foreign` FOREIGN KEY (`developer_id`) REFERENCES `developers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pages`
--
ALTER TABLE `pages`
  ADD CONSTRAINT `pages_developer_id_foreign` FOREIGN KEY (`developer_id`) REFERENCES `developers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `page_sections`
--
ALTER TABLE `page_sections`
  ADD CONSTRAINT `page_sections_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `page_sections_template_id_foreign` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `section_field_values`
--
ALTER TABLE `section_field_values`
  ADD CONSTRAINT `section_field_values_page_section_id_foreign` FOREIGN KEY (`page_section_id`) REFERENCES `page_sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `section_field_values_template_field_id_foreign` FOREIGN KEY (`template_field_id`) REFERENCES `template_fields` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `template_fields`
--
ALTER TABLE `template_fields`
  ADD CONSTRAINT `template_fields_template_id_foreign` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `validations`
--
ALTER TABLE `validations`
  ADD CONSTRAINT `validations_auditor_id_foreign` FOREIGN KEY (`auditor_id`) REFERENCES `auditors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `validations_developer_id_foreign` FOREIGN KEY (`developer_id`) REFERENCES `developers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
