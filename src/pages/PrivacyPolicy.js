import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import "../assets/css/PrivacyPolicy.css"
import { useTranslation } from 'react-i18next';


function PrivacyPolicy({isAdmin}){
    const [t, i18n] = useTranslation("global");

    return (
        <div>
            <Header isAdmin={isAdmin} />
            <div className="privacy-policy-container">
                <h1>{t("privacy_policy.title")}</h1>
                <h2>{t("privacy_policy.introduction.heading")}</h2>
                <p>{t("privacy_policy.introduction.content")}</p>
                <h2>{t("privacy_policy.information_collection.heading")}</h2>
                <p>{t("privacy_policy.information_collection.content.personal_info")}</p>
                <p>{t("privacy_policy.information_collection.content.cookies_and_usage_data")}</p>
                <h2>{t("privacy_policy.use_of_data.heading")}</h2>
                <p>{t("privacy_policy.use_of_data.content")}</p>
                <h2>{t("privacy_policy.data_sharing_and_disclosure.heading")}</h2>
                <p>{t("privacy_policy.data_sharing_and_disclosure.content")}</p>
                <h2>{t("privacy_policy.security.heading")}</h2>
                <p>{t("privacy_policy.security.content")}</p>
                <h2>{t("privacy_policy.changes_to_policy.heading")}</h2>
                <p>{t("privacy_policy.changes_to_policy.content")}</p>
                <h2>{t("privacy_policy.contact_us.heading")}</h2>
                <p>{t("privacy_policy.contact_us.content")}</p>
            </div>
            <Footer />
        </div>
    );
}

export default PrivacyPolicy;
