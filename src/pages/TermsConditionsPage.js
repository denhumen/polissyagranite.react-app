import React from 'react';
import Footer from '../components/Footer';
import "../assets/css/termsconditions.css"
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

function TermsConditionsPage(){
    const [t, i18n] = useTranslation("global");
    const { user } = useAuth();
    const isAdmin = !!user;

    return (
        <div>
            <Header isAdmin={isAdmin} />
            <div className="terms-conditions-container">
                <h1>{t("terms_conditions.title")}</h1>
                <p>{t("terms_conditions.introduction.content")}</p>
                <h2>{t("terms_conditions.user_guidelines.heading")}</h2>
                <p>{t("terms_conditions.user_guidelines.content")}</p>
                <h2>{t("terms_conditions.license.heading")}</h2>
                <p>{t("terms_conditions.license.content")}</p>
                <h2>{t("terms_conditions.disclaimer.heading")}</h2>
                <p>{t("terms_conditions.disclaimer.content")}</p>
                <h2>{t("terms_conditions.contact.heading")}</h2>
                <p>{t("terms_conditions.contact.content")}</p>
            </div>
            <Footer />
        </div>
    );
}

export default TermsConditionsPage;